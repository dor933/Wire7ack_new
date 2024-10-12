"use strict";
// packet_processor.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCaptureFile = processCaptureFile;
const child_process_1 = require("child_process");
const Packet_1 = require("./shared/Packet");
const ws_1 = require("ws");
const Stream_1 = require("./shared/Stream");
const fs_1 = __importDefault(require("fs"));
const json_bigint_1 = __importDefault(require("json-bigint"));
const dbops_1 = require("./dbops");
const main_1 = require("./main");
let lastpacketid = 0;
function Create_Stream(Index, connectionID, SourceIP, DestIP, ActivationID, Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol) {
    return new Stream_1.Stream(Index, connectionID, SourceIP, DestIP, ActivationID, [], Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol);
}
function Assign_Packet_To_Stream(packet, Streams) {
    let Relevant_stream = Streams.find(stream => stream.connectionID === packet.connectionID && stream.ActivationID === packet.ActivationID && stream.Protocol === packet.Protocol && ((stream.SourceIP === packet.SourceIP || stream.SourceIP === packet.DestinationIP) && (stream.DestinationIP === packet.DestinationIP || stream.DestinationIP === packet.SourceIP)));
    if (Relevant_stream === undefined) {
        fs_1.default.appendFileSync('tshark_output.log', 'packet ' + packet.PacketID + ' not found in any stream' + '\n');
        console.log("Stream not found");
        return false;
    }
    Relevant_stream.Packets.push(packet);
    fs_1.default.appendFileSync('tshark_output.log', 'packet ' + packet.PacketID + ' found in stream ' + Relevant_stream.connectionID + 'in activation' + packet.ActivationID + '\n');
    return Relevant_stream;
}
async function Check_Stream_Validity(stream) {
    let invalid = false;
    for (const packet of stream.Packets) {
        // General IP checksum validation
        if (packet.ipChecksumStatus !== undefined && packet.ipChecksumStatus !== 2) {
            invalid = true;
            break;
        }
        if (packet.Protocol === 'TCP') {
            // Check for TCP RST flag
            if (packet.tcpFlags && packet.tcpFlags.rst) {
                invalid = true;
                break;
            }
            // Check TCP checksum status
            if (packet.tcpChecksumStatus !== undefined && packet.tcpChecksumStatus !== 2) {
                invalid = true;
                break;
            }
            // Additional TCP error checks can be added here
        }
        else if (packet.Protocol === 'UDP') {
            // Check UDP checksum status
            if (packet.udpChecksumStatus !== undefined && packet.udpChecksumStatus !== 2) {
                invalid = true;
                break;
            }
            // Additional UDP error checks can be added here
        }
        else if (packet.Protocol === 'ICMP') {
            // Check ICMP checksum status
            if (packet.icmpChecksumStatus !== undefined && packet.icmpChecksumStatus !== 2) {
                invalid = true;
                break;
            }
            // ICMP Error Types
            const icmpErrorTypes = [3, 4, 5, 11, 12]; // Destination Unreachable, Source Quench, Redirect, Time Exceeded, Parameter Problem
            if (packet.icmpType !== undefined && icmpErrorTypes.includes(packet.icmpType)) {
                invalid = true;
                break;
            }
            // Additional ICMP error checks can be added here
        }
        else if (packet.Protocol === 'ARP') {
            // Validate ARP opcode
            if (packet.arpOpcode !== undefined && ![1, 2].includes(packet.arpOpcode)) {
                invalid = true;
                break;
            }
            // Additional ARP error checks can be added here
        }
        // Implement any other protocol-specific or general error checks here
    }
    stream.validity = !invalid;
}
async function processCaptureFile(filePath, ws, Streams, dbConnection, callback) {
    console.log(`Processing file: ${filePath}`);
    // Convert pcapng to JSON using tshark
    const tsharkCommand = `tshark -r "${filePath}" -T json`;
    const maxBuffer = 10000000000; // Increase buffer size if needed
    await new Promise((resolve, reject) => {
        (0, child_process_1.exec)(tsharkCommand, { maxBuffer: maxBuffer }, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Error processing ${filePath}: ${error.message}`);
                callback();
                return;
            }
            try {
                const JSONbigNative = (0, json_bigint_1.default)({ useNativeBigInt: true });
                const packetsArray = JSONbigNative.parse(stdout);
                // Process each packet
                packetsArray.forEach((packetObj) => {
                    fs_1.default.appendFileSync('tshark_output.log', JSON.stringify(packetObj) + '\n');
                    const packet = fromWiresharkToPacketObject(packetObj);
                    // Log packet information (optional)
                    // Process the packet (e.g., assign to streams)
                    let assignedStream = Assign_Packet_To_Stream(packet, Streams);
                    if (!assignedStream) {
                        // Create a new stream
                        let newStream = Create_Stream(Streams.length + 1, packet.connectionID, packet.SourceIP, packet.DestinationIP, packet.ActivationID, packet.Protocol, true, packet.Timestamp, packet.Timestamp, 0, 0, BigInt(0), packet.Protocol);
                        newStream.Packets.push(packet);
                        Streams.push(newStream);
                    }
                });
                const invalidStreams = [];
                // After processing all packets, check validity of streams
                Streams.forEach((stream) => {
                    Check_Stream_Validity(stream);
                    if (!stream.validity) {
                        invalidStreams.push(stream);
                    }
                    // Convert BigInt fields to strings if necessary
                    stream.DataVolume = stream.DataVolume.toString();
                });
                lastpacketid = await (0, dbops_1.getLastPacketId)(dbConnection);
                await (0, dbops_1.writeInvalidStreamsToDatabase)(invalidStreams, dbConnection, lastpacketid);
                // Send the full Streams array through the WebSocket
                const streamsData = JSON.stringify(Streams);
                // Send data to all connected clients
                ws.clients.forEach((client) => {
                    if (client.readyState === ws_1.WebSocket.OPEN) {
                        client.send(streamsData);
                    }
                });
                console.log(`Finished processing file: ${filePath}`);
                // Clear Streams array if needed
                Streams.length = 0;
                callback();
                resolve();
            }
            catch (parseError) {
                console.error(`Error parsing JSON from ${filePath}: ${parseError.message}`);
                callback();
                resolve();
            }
        });
    });
}
// Function to convert Wireshark JSON packet to your Packet object
function fromWiresharkToPacketObject(packetObj) {
    var _a;
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
    }
    else if (udp) {
        Protocol = 'UDP';
    }
    else if (icmp) {
        Protocol = 'ICMP';
    }
    else if (arp) {
        Protocol = 'ARP';
    }
    else {
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
    const Interface_and_protocol = '';
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
    }
    if (udp) {
        udpChecksumStatus = parseInt(udp['udp.checksum.status']) || undefined;
        connectionID = parseInt(udp['udp.stream']) || 0;
    }
    if (arp) {
        arpOpcode = parseInt(arp['arp.opcode']) || undefined;
        connectionID = parseInt(arp['arp.src.hw_mac']) || 0;
    }
    if (icmp) {
        icmpType = parseInt(icmp['icmp.type']) || undefined;
        icmpCode = parseInt(icmp['icmp.code']) || undefined;
        icmpChecksumStatus = parseInt(icmp['icmp.checksum.status']) || undefined;
        connectionID = parseInt(icmp['icmp.stream']) || 0;
    }
    if (ip) {
        ipChecksumStatus = parseInt(ip['ip.checksum.status']) || undefined;
    }
    const packet = new Packet_1.Packet(PacketID, SourceIP, DestinationIP, Protocol, '', // Payload can be extracted if needed
    Timestamp, Size, (_a = main_1.currentactivation === null || main_1.currentactivation === void 0 ? void 0 : main_1.currentactivation.ActivationID) !== null && _a !== void 0 ? _a : 0, sourceMAC, destinationMAC, sourcePort, DestPort, flags, frameLength, connectionID, Interface_and_protocol, tcpFlags, tcpSeq, tcpAck, tcpChecksumStatus, udpChecksumStatus, arpOpcode, ipChecksumStatus, false, // errorIndicator, initially false
    icmpType, icmpCode, icmpChecksumStatus);
    return packet;
}
