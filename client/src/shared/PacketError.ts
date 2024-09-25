export class PacketError {
    constructor(
      public packetNumber: number,
      public errorType: string,
      public severity: 'Low' | 'Medium' | 'High' | 'Critical',
      public sourceIP: string,
      public destinationIP: string,
      public protocol: string,
      public timestamp: Date
    ) {}
  }