"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create_Stream = Create_Stream;
exports.Assign_Packet_To_Stream = Assign_Packet_To_Stream;
exports.From_Wireshark_To_PacketObject = From_Wireshark_To_PacketObject;
exports.Check_Stream_Validity = Check_Stream_Validity;
const Packet_1 = require("../../shared/Packet");
const Stream_1 = require("../../shared/Stream");
function Create_Stream(connectionID, ActivationID, Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol) {
    return new Stream_1.Stream(connectionID, ActivationID, [], Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol);
}
function Assign_Packet_To_Stream(packet, Streams) {
    let Relevant_stream = Streams.find(stream => stream.connectionID === packet.connectionID && stream.ActivationID === packet.ActivationID && stream.Protocol === packet.Protocol);
    if (Relevant_stream === undefined) {
        console.log("Stream not found");
        return;
    }
    Relevant_stream.Packets.push(packet);
}
//create a function that runs through the stream object on its packets array and if there is at least one error packet, it will set the validity of the stream to false
async function Check_Stream_Validity(stream) {
    let error_packet = stream.Packets.find(packet => packet.flags === "0x00000002");
    if (error_packet !== undefined) {
        stream.validity = false;
    }
}
function From_Wireshark_To_PacketObject(data) {
    let packet = new Packet_1.Packet(0, '', '', '', '', new Date(), 0, 0, '', '', 0, '', 0, 0);
    let packet_parsed = JSON.parse(data);
    packet.PacketID = packet_parsed._source.layers.frame["frame.number"];
    packet.SourceIP = packet_parsed._source.layers.ip ? packet_parsed._source.layers.ip["ip.src"] : '';
    packet.DestinationIP = packet_parsed._source.layers.ip ? packet_parsed._source.layers.ip["ip.dst"] : '';
    packet.Protocol = packet_parsed._source.layers.frame["frame.protocols"];
    packet.Payload = packet_parsed._source.layers.tcp ? packet_parsed._source.layers.tcp["tcp.payload"] : packet_parsed._source.layers.udp ? packet_parsed._source.layers.udp["udp.payload"] : '';
    packet.Timestamp = new Date(packet_parsed._source.layers.frame["frame.time"]);
    packet.Size = packet_parsed._source.layers.frame["frame.len"];
    packet.ActivationID = 0;
    packet.sourceMAC = packet_parsed._source.layers.eth["eth.src"];
    packet.destinationMAC = packet_parsed._source.layers.eth["eth.dst"];
    packet.sourcePort = packet_parsed._source.layers.tcp ? packet_parsed._source.layers.tcp["tcp.srcport"] : packet_parsed._source.layers.udp ? packet_parsed._source.layers.udp["udp.srcport"] : 0;
    packet.flags = packet_parsed._source.layers.tcp ? packet_parsed._source.layers.tcp["tcp.flags"] : '';
    packet.frameLength = packet_parsed._source.layers.frame["frame.cap_len"];
    packet.connectionID = packet_parsed._source.layers.tcp ? packet_parsed._source.layers.tcp["tcp.stream"] : packet_parsed._source.layers.udp ? packet_parsed._source.layers.udp["udp.stream"] : 0;
    return packet;
}
