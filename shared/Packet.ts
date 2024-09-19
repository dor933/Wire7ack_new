export class Packet {
    constructor(
      public PacketID: number,
      public SourceIP: string,
      public DestinationIP: string,
      public Protocol: string,
      public Payload: string,
      public Timestamp: Date,
      public Size: number,
      public ActivationID: number, 
      public sourceMAC: string,
      public destinationMAC: string,
      public sourcePort: number,
      public DestPort: number,
      public flags: string,
      public frameLength: number,
      public connectionID: number,
      public Interface_and_protocol: string,
    ) {}
  }

  