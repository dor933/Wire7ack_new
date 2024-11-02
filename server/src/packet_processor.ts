// packet_processor.ts

import { exec } from 'child_process';
import { Packet } from './shared/Packet';
import { WebSocket, WebSocketServer } from 'ws';
import { Stream } from './shared/Stream';
import fs, { write } from 'fs';
import JSONBig from 'json-bigint';
import { ConnectionPool } from 'mssql';
import { writeInvalidStreamsToDatabase, getLastPacketId } from './dbops';
import { currentactivation } from './main';
import { detectError } from './Functions';


let lastpacketid=0;

 function Create_Stream(connectionID: number, SourceIP:string,DestIP:string, ActivationID: number, Protocol: string, validity: boolean, StartTime: Date, EndTime: Date, Duration: number, PacketCount: number, DataVolume: bigint, ApplicationProtocol: string): Stream {
    return new Stream( connectionID, SourceIP, DestIP, ActivationID,[], Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol);}

function Assign_Packet_To_Stream( packet: Packet, Streams: Stream[]): boolean|Stream {

    let Relevant_stream = Streams.find(stream => stream.connectionID === packet.connectionID && stream.ActivationID === packet.ActivationID && stream.Protocol === packet.Protocol && ((stream.SourceIP === packet.SourceIP || stream.SourceIP===packet.DestinationIP) && (stream.DestinationIP===packet.DestinationIP || stream.DestinationIP===packet.SourceIP)) );
    if(Relevant_stream === undefined){
      fs.appendFileSync('tshark_output.log', 'packet ' + packet.PacketID + ' not found in any stream' + '\n');
        console.log("Stream not found");
        return false;
    }
    Relevant_stream.Packets.push(packet);
    fs.appendFileSync('tshark_output.log', 'packet ' + packet.PacketID + ' found in stream ' + Relevant_stream.connectionID + 'in activation' + packet.ActivationID+ '\n');
    return Relevant_stream;

}

async function Check_Stream_Validity(stream: Stream): Promise<void> {
  let invalid = false;

  for (const packet of stream.Packets) {
    // General IP checksum validation
    if (packet.ipChecksumStatus !== undefined && packet.ipChecksumStatus !== 2) {
      invalid = true;
      packet.errorIndicator=true;
    }

    if (packet.Protocol === 'TCP') {
      // Check for TCP RST flag
      if (packet.tcpFlags && packet.tcpFlags.rst) {
        invalid = true;
        packet.errorIndicator=true;
      }
      // Check TCP checksum status
      if (packet.tcpChecksumStatus !== undefined && packet.tcpChecksumStatus !== 2) {
        invalid = true;
        packet.errorIndicator=true;
      }
      // Additional TCP error checks can be added here
    } else if (packet.Protocol === 'UDP') {
      // Check UDP checksum status
      if (packet.udpChecksumStatus !== undefined && packet.udpChecksumStatus !== 2) {
        invalid = true;
        packet.errorIndicator=true;
      }
      // Additional UDP error checks can be added here
    } else if (packet.Protocol === 'ICMP') {
      // Check ICMP checksum status
      if (packet.icmpChecksumStatus !== undefined && packet.icmpChecksumStatus !== 2) {
        invalid = true;
        packet.errorIndicator=true;
      }

      // ICMP Error Types
      const icmpErrorTypes = [3, 4, 5, 11, 12]; // Destination Unreachable, Source Quench, Redirect, Time Exceeded, Parameter Problem

      if (packet.icmpType !== undefined && icmpErrorTypes.includes(packet.icmpType)) {
        invalid = true;
        packet.errorIndicator=true;
      }

      // Additional ICMP error checks can be added here
    } else if (packet.Protocol === 'ARP') {
      // Validate ARP opcode
      if (packet.arpOpcode !== undefined && ![1, 2].includes(packet.arpOpcode)) {
        invalid = true;
        packet.errorIndicator=true;
      }
      // Additional ARP error checks can be added here
    }

    // Implement any other protocol-specific or general error checks here
  }

  stream.validity = !invalid;
}


export async function processCaptureFile(
  filePath: string,
  ws: WebSocketServer,
  Streams: Stream[],
  dbConnection: ConnectionPool,
  callback: () => void
): Promise<void> {
  console.log(`Processing file: ${filePath}`);

  // Convert pcapng to JSON using tshark
  const tsharkCommand = `tshark -r "${filePath}" -T json`;

  const maxBuffer: number = 10_000_000_000; // Increase buffer size if needed

  await new Promise<void>((resolve, reject) => { exec(tsharkCommand, { maxBuffer: maxBuffer }, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error processing ${filePath}: ${error.message}`);
      callback();
      return;
    }

    try {
      const JSONbigNative = JSONBig({ useNativeBigInt: true });
      const packetsArray = JSONbigNative.parse(stdout);

      // Process each packet
      packetsArray.forEach((packetObj: any) => {

    
        fs.appendFileSync('tshark_output.log', JSON.stringify(packetObj) + '\n');

        const packet = fromWiresharkToPacketObject(packetObj);

        // Log packet information (optional)
        

        // Process the packet (e.g., assign to streams)
        let assignedStream = Assign_Packet_To_Stream(packet, Streams);

        if (!assignedStream) {
          // Create a new stream
          let newStream = Create_Stream(
            packet.connectionID,
            packet.SourceIP,
            packet.DestinationIP,
            packet.ActivationID,
            packet.Protocol,
            true,
            packet.Timestamp,
            packet.Timestamp,
            0,
            0,
            BigInt(0),
            packet.ApplicationProtocol
          );
          newStream.Packets.push(packet);
          Streams.push(newStream);
        } 
      });

      const invalidStreams: Stream[] = [];
      // After processing all packets, check validity of streams
      Streams.forEach((stream) => {
        Check_Stream_Validity(stream);
        if (!stream.validity) {
          if(detectError(stream)){
            stream.Packets=stream.Packets.slice(-12);
          }
          
          invalidStreams.push(stream);
        }
        else{
          stream.Packets=stream.Packets.slice(-4);
        }
        // Convert BigInt fields to strings if necessary
        stream.DataVolume = stream.DataVolume.toString();
      });

      lastpacketid=await getLastPacketId(dbConnection);

      await writeInvalidStreamsToDatabase(invalidStreams, dbConnection);

      // Send the full Streams array through the WebSocket
      const streamsData = JSON.stringify(Streams);

      // Send data to all connected clients
      ws.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(streamsData);
        }
      });

      console.log(`Finished processing file: ${filePath}`);

      // Clear Streams array if needed
      Streams.length = 0;

      callback();
      resolve();
    } 
    
    
    catch (parseError: any) {
      console.error(`Error parsing JSON from ${filePath}: ${parseError.message}`);
      callback();
      resolve();
    }
  });
  });
}

// Function to convert Wireshark JSON packet to your Packet object
function fromWiresharkToPacketObject(packetObj: any): Packet {
  const layers = packetObj._source.layers;
  const frame = layers.frame;
  const eth = layers.eth;
  const ip = layers.ip;
  const tcp = layers.tcp;
  const udp = layers.udp;
  const arp = layers.arp;
  const icmp = layers.icmp;

  // Determine the protocol
  let Protocol = '';
  if (tcp) {
    Protocol = 'TCP';
  } else if (udp) {
    Protocol = 'UDP';
  } else if (icmp) {
    Protocol = 'ICMP';
  } else if (arp) {
    Protocol = 'ARP';
  } else {
    Protocol = 'OTHER';
  }

  // Extract common fields
  const PacketID = parseInt(frame['frame.number']);
  const SourceIP = ip ? ip['ip.src'] || '' : '';
  const DestinationIP = ip ? ip['ip.dst'] || '' : '';
  const Timestamp = new Date(parseFloat(frame['frame.time_epoch']) * 1000);
  const Size = parseInt(frame['frame.len']);
  const sourceMAC = eth ? eth['eth.src'] || '' : '';
  const destinationMAC = eth ? eth['eth.dst'] || '' : '';
  const sourcePort = tcp
    ? parseInt(tcp['tcp.srcport'])
    : udp
    ? parseInt(udp['udp.srcport'])
    : 0;
  const DestPort = tcp
    ? parseInt(tcp['tcp.dstport'])
    : udp
    ? parseInt(udp['udp.dstport'])
    : 0;
  const flags = tcp ? tcp['tcp.flags'] || '' : '';
  const frameLength = parseInt(frame['frame.len']);
  // Initialize other fields as needed
  const ActivationID = 0;
  let connectionID = 0;
  let ApplicationProtocol = '';

  // Existing fields for error detection
  let tcpFlags;
  let tcpSeq;
  let tcpAck;
  let tcpChecksumStatus;
  let udpChecksumStatus;
  let arpOpcode;
  let ipChecksumStatus;

  // New fields for ICMP
  let icmpType;
  let icmpCode;
  let icmpChecksumStatus;

  // Extract protocol-specific fields
  if (tcp) {
    const tcpFlagsTree = tcp['tcp.flags_tree'] || {};
    tcpFlags = {
      syn: tcpFlagsTree['tcp.flags.syn'] === '1',
      ack: tcpFlagsTree['tcp.flags.ack'] === '1',
      fin: tcpFlagsTree['tcp.flags.fin'] === '1',
      rst: tcpFlagsTree['tcp.flags.reset'] === '1',
      psh: tcpFlagsTree['tcp.flags.push'] === '1',
      urg: tcpFlagsTree['tcp.flags.urg'] === '1',
      ece: tcpFlagsTree['tcp.flags.ece'] === '1',
      cwr: tcpFlagsTree['tcp.flags.cwr'] === '1',
      ns: tcpFlagsTree['tcp.flags.ns'] === '1',
    };
    tcpSeq = parseInt(tcp['tcp.seq_raw']) || undefined;
    tcpAck = parseInt(tcp['tcp.ack_raw']) || undefined;
    tcpChecksumStatus = parseInt(tcp['tcp.checksum.status']) || undefined;
    connectionID = parseInt(tcp['tcp.stream']) || 0;

    if(sourcePort==443 || DestPort==443){
      ApplicationProtocol='HTTPS';

    }
    else if(sourcePort==80 || DestPort==80){
      ApplicationProtocol='HTTP';
    }
    else if(sourcePort==22 || DestPort==22){
      ApplicationProtocol='SSH';
    }
    else if(sourcePort==53 || DestPort==53){
      ApplicationProtocol='DNS';
    }
    else{
      ApplicationProtocol='OTHER';
    }
  }

  if (udp) {
    udpChecksumStatus = parseInt(udp['udp.checksum.status']) || undefined;
    connectionID = parseInt(udp['udp.stream']) || 0;
    if(sourcePort==53 || DestPort==53){
      ApplicationProtocol='DNS';
    }
    else{
      ApplicationProtocol='OTHER';
    }
  }

  if (arp) {
    arpOpcode = parseInt(arp['arp.opcode']) || undefined;
    connectionID = parseInt(arp['arp.src.hw_mac']) || 0;
    ApplicationProtocol='ARP';
  }

  if (icmp) {
    icmpType = parseInt(icmp['icmp.type']) || undefined;
    icmpCode = parseInt(icmp['icmp.code']) || undefined;
    icmpChecksumStatus = parseInt(icmp['icmp.checksum.status']) || undefined;
    connectionID = parseInt(icmp['icmp.stream']) || 0;
    ApplicationProtocol='ICMP';
  }

  if (ip) {
    ipChecksumStatus = parseInt(ip['ip.checksum.status']) || undefined;
  }

  const packet = new Packet(
    PacketID,
    SourceIP,
    DestinationIP,
    Protocol,
    '', // Payload can be extracted if needed
    Timestamp,
    Size,
    currentactivation?.ActivationID||0,
    sourceMAC,
    destinationMAC,
    sourcePort,
    DestPort,
    flags,
    frameLength,
    connectionID,
    ApplicationProtocol,
    tcpFlags,
    tcpSeq,
    tcpAck,
    tcpChecksumStatus,
    udpChecksumStatus,
    arpOpcode,
    ipChecksumStatus,
    false, // errorIndicator, initially false
    icmpType,
    icmpCode,
    icmpChecksumStatus
  );

  return packet;
}