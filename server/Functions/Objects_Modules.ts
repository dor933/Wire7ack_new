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

//create a function that runs through the stream object on its packets array and if there is at least one error packet, it will set the validity of the stream to false
async function Check_Stream_Validity(stream: Stream): Promise<void> {
    let error_packet = stream.Packets.find(packet => packet.flags === "0x00000002");
    if(error_packet !== undefined){
        stream.validity = false;
    }
}

async function From_Wireshark_To_PacketObject(packetObj: any): Promise<Packet>   {
    try{
        const layers = packetObj.layers;
        const frame = layers.frame;
        const eth = layers.eth;
        const ip = layers.ip || layers.ipv6;
        const tcp = layers.tcp;
        const udp = layers.udp;
        const icmp = layers.icmp || layers.icmpv6;
    
        const packetID = parseInt(frame['frame_frame_number'] || '0');
        const timestampStr = frame['frame_frame_time_epoch'] || frame['frame_frame_time'];
        const timestamp = new Date(Date.parse(timestampStr));
        const size = parseInt(frame['frame_frame_len'] || '0');
        const sourceMAC = eth ? eth['eth_eth_src'] : '';
        const destinationMAC = eth ? eth['eth_eth_dst'] : '';
        const sourceIP = ip ? (ip['ip_ip_src'] || ip['ipv6_ipv6_src']) : '';
        const destinationIP = ip ? (ip['ip_ip_dst'] || ip['ipv6_ipv6_dst']) : '';
        const protocol = frame['frame_frame_protocols'] || '';
        const payload = ''; // Extract payload if necessary
        const activationID = 0; // Define based on your logic
        const frameLength = size;
    
        let sourcePort = 0;
        let flags = '';
        let connectionID = 0;
    
        if (tcp) {
            sourcePort = parseInt(tcp['tcp_tcp_srcport'] || '0');
            flags = tcp['tcp_tcp_flags'] || '';
            connectionID = parseInt(tcp['tcp_tcp_stream'] || '0');
        } else if (udp) {
            sourcePort = parseInt(udp['udp_udp_srcport'] || '0');
            connectionID = parseInt(udp['udp_udp_stream'] || '0');
        } else if (icmp) {
            // Handle ICMP packets
            sourcePort = 0; // ICMP doesn't have ports
            flags = '';     // No flags in ICMP
            connectionID = packetID; // Use packet ID as connection ID
        }
    
        return new Packet(
            packetID,
            sourceIP,
            destinationIP,
            protocol,
            payload,
            timestamp,
            size,
            activationID,
            sourceMAC,
            destinationMAC,
            sourcePort,
            flags,
            frameLength,
            connectionID
        );
    } catch (error) {
        console.log('Error in From_Wireshark_To_PacketObject:', error);
        return new Packet(0, '', '', '', '', new Date(), 0, 0, '', '', 0, '', 0, 0);
    }

}

export {Create_Stream, Assign_Packet_To_Stream, From_Wireshark_To_PacketObject, Check_Stream_Validity};