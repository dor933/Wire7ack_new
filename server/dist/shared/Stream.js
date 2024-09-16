"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stream = void 0;
class Stream {
    constructor(connectionID, ActivationID, Packets, Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol) {
        this.connectionID = connectionID;
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
