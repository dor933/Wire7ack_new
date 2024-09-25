export class AnalysisDetails {
    constructor(
      public connectionID: number, 
      public Protocol: string,
      public ActivationID: number,
      public Errors: string[],
      public Warnings: string[],
      public AnalysisDetails: string
    ) {}
  }