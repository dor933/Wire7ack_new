"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packet = void 0;
class Packet {
    constructor(PacketID, SourceIP, DestinationIP, Protocol, Payload, Timestamp, Size, ActivationID, sourceMAC, destinationMAC, sourcePort, flags, frameLength, connectionID) {
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
        this.flags = flags;
        this.frameLength = frameLength;
        this.connectionID = connectionID;
    }
}
exports.Packet = Packet;
