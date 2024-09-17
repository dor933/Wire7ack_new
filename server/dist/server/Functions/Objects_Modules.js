"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Check_Stream_Validity = exports.From_Wireshark_To_PacketObject = exports.Assign_Packet_To_Stream = exports.Create_Stream = void 0;
const Packet_1 = require("../../shared/Packet");
const Stream_1 = require("../../shared/Stream");
function Create_Stream(connectionID, ActivationID, Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol) {
    return new Stream_1.Stream(connectionID, ActivationID, [], Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol);
}
exports.Create_Stream = Create_Stream;
function Assign_Packet_To_Stream(packet, Streams) {
    let Relevant_stream = Streams.find(stream => stream.connectionID === packet.connectionID && stream.ActivationID === packet.ActivationID && stream.Protocol === packet.Protocol);
    if (Relevant_stream === undefined) {
        console.log("Stream not found");
        return;
    }
    Relevant_stream.Packets.push(packet);
}
exports.Assign_Packet_To_Stream = Assign_Packet_To_Stream;
//create a function that runs through the stream object on its packets array and if there is at least one error packet, it will set the validity of the stream to false
async function Check_Stream_Validity(stream) {
    let error_packet = stream.Packets.find(packet => packet.flags === "0x00000002");
    if (error_packet !== undefined) {
        stream.validity = false;
    }
}
exports.Check_Stream_Validity = Check_Stream_Validity;
async function From_Wireshark_To_PacketObject(packetObj) {
    try {
        const layers = packetObj.layers;
        const frame = layers.frame;
        const eth = layers.eth;
        const ip = layers.ip || layers.ipv6;
        const tcp = layers.tcp;
        const udp = layers.udp;
        const icmp = layers.icmp || layers.icmpv6;
        const packetID = parseInt(frame['frame_frame_number'] || '0');
        const timestampStr = frame['frame_frame_time_epoch'] || frame['frame_frame_time'];
        const timestamp = new Date(Date.parse(timestampStr));
        const size = parseInt(frame['frame_frame_len'] || '0');
        const sourceMAC = eth ? eth['eth_eth_src'] : '';
        const destinationMAC = eth ? eth['eth_eth_dst'] : '';
        const sourceIP = ip ? (ip['ip_ip_src'] || ip['ipv6_ipv6_src']) : '';
        const destinationIP = ip ? (ip['ip_ip_dst'] || ip['ipv6_ipv6_dst']) : '';
        const protocol = frame['frame_frame_protocols'] || '';
        const payload = ''; // Extract payload if necessary
        const activationID = 0; // Define based on your logic
        const frameLength = size;
        let sourcePort = 0;
        let flags = '';
        let connectionID = 0;
        if (tcp) {
            sourcePort = parseInt(tcp['tcp_tcp_srcport'] || '0');
            flags = tcp['tcp_tcp_flags'] || '';
            connectionID = parseInt(tcp['tcp_tcp_stream'] || '0');
        }
        else if (udp) {
            sourcePort = parseInt(udp['udp_udp_srcport'] || '0');
            connectionID = parseInt(udp['udp_udp_stream'] || '0');
        }
        else if (icmp) {
            // Handle ICMP packets
            sourcePort = 0; // ICMP doesn't have ports
            flags = ''; // No flags in ICMP
            connectionID = packetID; // Use packet ID as connection ID
        }
        return new Packet_1.Packet(packetID, sourceIP, destinationIP, protocol, payload, timestamp, size, activationID, sourceMAC, destinationMAC, sourcePort, flags, frameLength, connectionID);
    }
    catch (error) {
        console.log('Error in From_Wireshark_To_PacketObject:', error);
        return new Packet_1.Packet(0, '', '', '', '', new Date(), 0, 0, '', '', 0, '', 0, 0);
    }
}
exports.From_Wireshark_To_PacketObject = From_Wireshark_To_PacketObject;
