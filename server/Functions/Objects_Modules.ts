import {Packet} from '../../shared/Packet';
import {Stream} from '../../shared/Stream';


function Create_Stream(connectionID: number, ActivationID: number, Protocol: string, validity: boolean, StartTime: Date, EndTime: Date, Duration: number, PacketCount: number, DataVolume: bigint, ApplicationProtocol: string): Stream {
    return new Stream(connectionID, ActivationID, [], Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol);
}

function Assign_Packet_To_Stream( packet: Packet, Streams: Stream[]): void {

    let Relevant_stream = Streams.find(stream => stream.connectionID === packet.connectionID && stream.ActivationID === packet.ActivationID && stream.Protocol === packet.Protocol);
    if(Relevant_stream === undefined){
        console.log("Stream not found");
        return;
    }
    Relevant_stream.Packets.push(packet);

}

function From_Wireshark_To_PacketObject(data: string): Packet {
    
    let packet = new Packet(0, '', '', '', '', new Date(), 0, 0, '', '', 0, '', 0, 0);
    let packet_parsed = JSON.parse(data);

    packet.PacketID = packet_parsed._source.layers.frame["frame.number"];
    packet.SourceIP = packet_parsed._source.layers.ip["ip.src"];
    packet.DestinationIP = packet_parsed._source.layers.ip["ip.dst"];
    packet.Protocol = packet_parsed._source.layers.frame["frame.protocols"];
    packet.Payload = packet_parsed._source.layers.tcp ? packet_parsed._source.layers.tcp["tcp.payload"] : ''; 
    packet.Timestamp = new Date(packet_parsed._source.layers.frame["frame.time"]);
    packet.Size = packet_parsed._source.layers.frame["frame.len"];
    packet.ActivationID = 0; 
    packet.sourceMAC = packet_parsed._source.layers.eth["eth.src"];
    packet.destinationMAC = packet_parsed._source.layers.eth["eth.dst"];
    packet.sourcePort = packet_parsed._source.layers.tcp ? packet_parsed._source.layers.tcp["tcp.srcport"] : 0;
    packet.flags = packet_parsed._source.layers.tcp ? packet_parsed._source.layers.tcp["tcp.flags"] : ''; 
    packet.frameLength = packet_parsed._source.layers.frame["frame.cap_len"];
    packet.connectionID = packet_parsed._source.layers.tcp ? packet_parsed._source.layers.tcp["tcp.stream"] : 0; 

    return packet;
}

export {Create_Stream, Assign_Packet_To_Stream, From_Wireshark_To_PacketObject};