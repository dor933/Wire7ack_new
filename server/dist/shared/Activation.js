"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activation = void 0;
class Activation {
    constructor(ActivationID, userID, StartTime, EndTime, ActivatedBy, Status, destIPs, sourceIPs, protocol) {
        this.ActivationID = ActivationID;
        this.userID = userID;
        this.StartTime = StartTime;
        this.EndTime = EndTime;
        this.ActivatedBy = ActivatedBy;
        this.Status = Status;
        this.destIPs = destIPs;
        this.sourceIPs = sourceIPs;
        this.protocol = protocol;
    }
}
exports.Activation = Activation;
