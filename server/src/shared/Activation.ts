export class Activation {
    constructor(
      public ActivationID: number,
      public userID: number,
      public StartTime: Date,
      public EndTime: Date,
      public ActivatedBy: string,
      public Status: string,
      public destIPs: string,
      public sourceIPs: string,
      public protocol: string
    ) {}
  }