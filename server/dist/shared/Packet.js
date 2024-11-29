"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packet = void 0;
class Packet {
    constructor(PacketID, SourceIP, DestinationIP, Protocol, Payload, Timestamp, Size, ActivationID, sourceMAC, destinationMAC, sourcePort, DestPort, flags, frameLength, connectionID, InterfaceAndProtocol, 
    // Existing fields for error detection
    tcpFlags, tcpSeq, tcpAck, tcpChecksumStatus, udpChecksumStatus, arpOpcode, ipChecksumStatus, errorIndicator, 
    // New fields for ICMP
    icmpType, icmpCode, icmpChecksumStatus) {
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
        this.InterfaceAndProtocol = InterfaceAndProtocol;
        this.tcpFlags = tcpFlags;
        this.tcpSeq = tcpSeq;
        this.tcpAck = tcpAck;
        this.tcpChecksumStatus = tcpChecksumStatus;
        this.udpChecksumStatus = udpChecksumStatus;
        this.arpOpcode = arpOpcode;
        this.ipChecksumStatus = ipChecksumStatus;
        this.errorIndicator = errorIndicator;
        this.icmpType = icmpType;
        this.icmpCode = icmpCode;
        this.icmpChecksumStatus = icmpChecksumStatus;
    }
}
exports.Packet = Packet;
