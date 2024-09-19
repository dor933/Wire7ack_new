"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packet = void 0;
class Packet {
    constructor(PacketID, SourceIP, DestinationIP, Protocol, Payload, Timestamp, Size, ActivationID, sourceMAC, destinationMAC, sourcePort, DestPort, flags, frameLength, connectionID, Interface_and_protocol) {
        this.PacketID = PacketID;
        this.SourceIP = SourceIP;
        this.DestinationIP = DestinationIP;
        this.Protocol = Protocol;
        this.Payload = Payload;
        this.Timestamp = Timestamp;
        this.Size = Size;
        this.ActivationID = ActivationID;
        this.sourceMAC = sourceMAC;
        this.destinationMAC = destinationMAC;
        this.sourcePort = sourcePort;
        this.DestPort = DestPort;
        this.flags = flags;
        this.frameLength = frameLength;
        this.connectionID = connectionID;
        this.Interface_and_protocol = Interface_and_protocol;
    }
}
exports.Packet = Packet;
