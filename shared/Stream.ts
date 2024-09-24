import { Packet } from "./Packet";


export class Stream {
    constructor(
      public Index: number,
      public connectionID: number,
      public SourceIP: string,
      public DestinationIP: string,
      public ActivationID: number,
      public Packets: Packet[],
      public Protocol: string,
      public validity: boolean,
      public StartTime: Date,
      public EndTime: Date,
      public Duration: number,
      public PacketCount: number,
      public DataVolume: bigint,
      public ApplicationProtocol: string
    ) {}
  }