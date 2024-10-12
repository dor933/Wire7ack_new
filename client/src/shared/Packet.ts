export class Packet {
  constructor(
    public PacketID: number,
    public SourceIP: string,
    public DestinationIP: string,
    public Protocol: string,
    public Payload: string,
    public Validity: boolean,
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
    // Existing fields for error detection
    public tcpFlags?: {
      syn: boolean;
      ack: boolean;
      fin: boolean;
      rst: boolean;
      psh: boolean;
      urg: boolean;
      ece: boolean;
      cwr: boolean;
      ns: boolean;
    },
    public tcpSeq?: number,
    public tcpAck?: number,
    public tcpChecksumStatus?: number,
    public udpChecksumStatus?: number,
    public arpOpcode?: number,
    public ipChecksumStatus?: number,
    public errorIndicator?: boolean,
    // New fields for ICMP
    public icmpType?: number,
    public icmpCode?: number,
    public icmpChecksumStatus?: number
  ) {}
}