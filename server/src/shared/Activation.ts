export class Activation {
    constructor(
      public ActivationID: number,
      public userID: number,
      public StartTime: Date,
      public EndTime: Date,
      public ActivatedBy: string,
      public Status: string,
      public IPHOST1: string,
      public IPHOST2: string,
      public IPHOST3: string,
      public IPHOST4: string,
      public protocols: string
    ) {}
  }