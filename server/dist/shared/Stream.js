"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stream = void 0;
class Stream {
    constructor(Index, connectionID, SourceIP, DestinationIP, ActivationID, Packets, Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol) {
        this.Index = Index;
        this.connectionID = connectionID;
        this.SourceIP = SourceIP;
        this.DestinationIP = DestinationIP;
        this.ActivationID = ActivationID;
        this.Packets = Packets;
        this.Protocol = Protocol;
        this.validity = validity;
        this.StartTime = StartTime;
        this.EndTime = EndTime;
        this.Duration = Duration;
        this.PacketCount = PacketCount;
        this.DataVolume = DataVolume;
        this.ApplicationProtocol = ApplicationProtocol;
    }
}
exports.Stream = Stream;
