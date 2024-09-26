// packet_processor.ts

import { exec } from 'child_process';
import { Packet } from './shared/Packet';
import { WebSocket, WebSocketServer } from 'ws';
import { Stream } from './shared/Stream';
import fs from 'fs';
import JSONBig from 'json-bigint';

 function Create_Stream(Index:number,connectionID: number, SourceIP:string,DestIP:string, ActivationID: number, Protocol: string, validity: boolean, StartTime: Date, EndTime: Date, Duration: number, PacketCount: number, DataVolume: bigint, ApplicationProtocol: string): Stream {
    return new Stream(Index, connectionID, SourceIP, DestIP, ActivationID, [], Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol);}

function Assign_Packet_To_Stream( packet: Packet, Streams: Stream[]): boolean|Stream {

    let Relevant_stream = Streams.find(stream => stream.connectionID === packet.connectionID && stream.ActivationID === packet.ActivationID && stream.Protocol === packet.Protocol);
    if(Relevant_stream === undefined){
        console.log("Stream not found");
        return false;
    }
    Relevant_stream.Packets.push(packet);
    return true;

}

//create a function that runs through the stream object on its packets array and if there is at least one error packet, it will set the validity of the stream to false
async function Check_Stream_Validity(stream: Stream): Promise<void> {

    let error_packet = stream.Packets.find(packet => packet.flags === "0x00000002");
    if(error_packet !== undefined){
        stream.validity = false;
    }
}

export function processCaptureFile(
  filePath: string,
  ws: WebSocketServer,
  Streams: Stream[],
  callback: () => void
): void {
  console.log(`Processing file: ${filePath}`);

  // Convert pcapng to JSON using tshark
  const tsharkCommand = `tshark -r "${filePath}" -T json`;

  const execOptions1  = {
    maxBuffer: 10 * 1024 * 1024, // 10 MB
  };

  exec(tsharkCommand,{maxBuffer:10*1024*1024}, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error processing ${filePath}: ${error.message}`);
      callback();
      return;
    }

    try {

      const JSONbigNative = JSONBig({ useNativeBigInt: true });
      const packetsArray = JSONbigNative.parse(stdout);
      




      // Process each packet
      packetsArray.forEach( (packetObj: any) => {
        console.dir(packetObj, { depth: null, colors: true });

        const packetDatawrite = JSON.stringify(packetObj);


        const packet = fromWiresharkToPacketObject(packetObj);

        // Process the packet (e.g., assign to streams)

            console.log('entered to check stream');
        
        let assign_to_stream=Assign_Packet_To_Stream(packet,Streams);
        if(!assign_to_stream){
             let new_stream =  Create_Stream(Streams.length+1,packet.connectionID,packet.SourceIP,packet.DestinationIP,packet.ActivationID,packet.Protocol,true,packet.Timestamp,packet.Timestamp,0,0,BigInt(0),packet.Protocol);
            new_stream.Packets.push(packet);
            Streams.push(new_stream);

            if(Streams.length>1){
                  Check_Stream_Validity(Streams[Streams.length-2]);

                 console.log('entered to send stream');
                 let streamData =Streams[Streams.length-2]
                 streamData.DataVolume= streamData.DataVolume.toString();
                 let mystream=JSON.stringify(streamData);
                 ws.clients.forEach((client: WebSocket) => {
                  if (client.readyState === WebSocket.OPEN) {
                      client.send(mystream);
                  }
                  }
                );



       
          }



        }

        if(assign_to_stream instanceof Stream){

          assign_to_stream.DataVolume= assign_to_stream.DataVolume.toString();
          let mystream=JSON.stringify(assign_to_stream);
          

        ws.clients.forEach((client: WebSocket) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(mystream);
          }
        })
      }
          

      

   

      }

        );

        
    

      console.log(`Finished processing file: ${filePath}`);
      callback();
    } catch (parseError:any) {
      console.error(`Error parsing JSON from ${filePath}: ${parseError.message}`);
      callback();
    }
  });
}

// Function to convert Wireshark JSON packet to your Packet object
function fromWiresharkToPacketObject(packetObj: any): Packet {
  const layers = packetObj._source.layers;
  const frame = layers.frame;
  const eth = layers.eth;
  const ip = layers.ip || layers.ipv6;
  const tcp = layers.tcp;
  const udp = layers.udp;
  const icmp = layers.icmp || layers.icmpv6;
  const arp=layers.arp;

  const packetID = parseInt(frame['frame.number'] || '0', 10);
  const timestampStr = frame['frame.time_epoch'] || frame['frame.time'];
  const timestamp = new Date(parseFloat(timestampStr) * 1000);
  const size = parseInt(frame['frame.len'] || '0', 10);
  const sourceMAC = eth ? eth['eth.src'] : '';
  const destinationMAC = eth ? eth['eth.dst'] : '';
  const sourceIP = ip ? ip['ip.src'] || ip['ipv6.src'] : '';
  const destinationIP = ip ? ip['ip.dst'] || ip['ipv6.dst'] : '';
  const interface_and_protocol = frame['frame.protocols'] || '';
  let payload = '';
  const activationID = 0; // Set according to your logic
  let protocol='';

  let sourcePort = 0;
  let DestPort = 0;
  let flags = '';
  let connectionID = 0;

  if (tcp) {
    sourcePort = parseInt(tcp['tcp.srcport'] || '0', 10);
    DestPort = parseInt(tcp['tcp.dstport'] || '0', 10);
    payload = tcp['tcp.payload'] || '';
    flags = tcp['tcp.flags'] || '';
    connectionID = parseInt(tcp['tcp.stream'] || '0', 10);
    protocol = 'TCP';
  } else if (udp) {
    sourcePort = parseInt(udp['udp.srcport'] || '0', 10);
    payload = udp['udp.payload'] || '';
    DestPort = parseInt(udp['udp.dstport'] || '0', 10);
    connectionID = parseInt(udp['udp.stream'] || '0', 10);
    protocol = 'UDP';
  } else if (icmp || layers.icmpv6) {
    // Handle ICMP packets
    sourcePort = 0;
    flags = '';
    connectionID = packetID; // Use packet ID as connection ID
    protocol = 'ICMP';
  }
  else if(arp){
    protocol='ARP';
  }

  // Create and return your Packet object
  const packet: Packet = {
    PacketID: packetID,
    SourceIP: sourceIP,
    DestinationIP: destinationIP,
    Protocol: protocol,
    Payload: payload,
    Timestamp: timestamp,
    ActivationID:activationID,
    sourceMAC: sourceMAC,
    destinationMAC: destinationMAC,
    sourcePort: sourcePort,
    flags: flags,
    frameLength: size,
    connectionID,
    Size: size,
    Interface_and_protocol: interface_and_protocol,
    DestPort: DestPort,
  };

  return packet;
}
