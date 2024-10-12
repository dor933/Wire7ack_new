"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activation = void 0;
class Activation {
    constructor(ActivationID, userID, StartTime, EndTime, ActivatedBy, Status, IPHOST1, IPHOST2, IPHOST3, IPHOST4, protocols) {
        this.ActivationID = ActivationID;
        this.userID = userID;
        this.StartTime = StartTime;
        this.EndTime = EndTime;
        this.ActivatedBy = ActivatedBy;
        this.Status = Status;
        this.IPHOST1 = IPHOST1;
        this.IPHOST2 = IPHOST2;
        this.IPHOST3 = IPHOST3;
        this.IPHOST4 = IPHOST4;
        this.protocols = protocols;
    }
}
exports.Activation = Activation;
