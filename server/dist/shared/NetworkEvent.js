"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkEvent = void 0;
class NetworkEvent {
    constructor(NetworkEventID, connectionID, PacketErrorID, Status, ErrorCode, WarningType, AnalysisDetails) {
        this.NetworkEventID = NetworkEventID;
        this.connectionID = connectionID;
        this.PacketErrorID = PacketErrorID;
        this.Status = Status;
        this.ErrorCode = ErrorCode;
        this.WarningType = WarningType;
        this.AnalysisDetails = AnalysisDetails;
    }
}
exports.NetworkEvent = NetworkEvent;
