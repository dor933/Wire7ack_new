"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisDetails = void 0;
class AnalysisDetails {
    constructor(connectionID, Protocol, ActivationID, Errors, Warnings, AnalysisDetails) {
        this.connectionID = connectionID;
        this.Protocol = Protocol;
        this.ActivationID = ActivationID;
        this.Errors = Errors;
        this.Warnings = Warnings;
        this.AnalysisDetails = AnalysisDetails;
    }
}
exports.AnalysisDetails = AnalysisDetails;
