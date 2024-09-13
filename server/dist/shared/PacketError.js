"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketError = void 0;
class PacketError {
    constructor(packetNumber, errorType, severity, sourceIP, destinationIP, protocol, timestamp) {
        this.packetNumber = packetNumber;
        this.errorType = errorType;
        this.severity = severity;
        this.sourceIP = sourceIP;
        this.destinationIP = destinationIP;
        this.protocol = protocol;
        this.timestamp = timestamp;
    }
}
exports.PacketError = PacketError;
