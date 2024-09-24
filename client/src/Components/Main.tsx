import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sub_Header from './Sub_Header';
import Main_Comp from './Main_Comp';
import { useGlobal } from './Context/Global';
import {Stream} from '../../../shared/Stream';

const Main: React.FC = () => {

    const [streams, setStreams] = useState<Stream[]>([]);
    const [message, setMessage] = useState<string>('')
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [messages, setMessages] = useState<string[]>([])
    const { isCaptureStarted, setIsCaptureStarted } = useGlobal();
    const { isConnectionopen, setIsConnectionopen } = useGlobal();
    const rows: Stream[] = [
        {
            
            Index: 1,
            connectionID: 1,
            ActivationID: 1,
            SourceIP:"192.168.1.1",
            DestinationIP:"192.168.10.1",
          
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
    
                { PacketID: 1, Size: 512, Timestamp: new Date(),SourceIP:"192.168.1.1", DestinationIP:"192.168.10.1", Protocol:"TCP", Payload:"GET / HTTP/1.1", ActivationID:1, sourceMAC:"00:00:00:00:00:00", destinationMAC:"00:00:00:00:00:00", sourcePort:80, DestPort:443, flags:"SYN", frameLength:100, connectionID:1, Interface_and_protocol:"eth0" },
        
            ]
        },
        {
            Index: 2,
            connectionID: 1,
            ActivationID: 1,
            SourceIP:"192.168.1.1",
            DestinationIP:"192.168.10.1",
          
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
    
                { PacketID: 1, Size: 512, Timestamp: new Date(),SourceIP:"192.168.1.1", DestinationIP:"192.168.10.1", Protocol:"TCP", Payload:"GET / HTTP/1.1", ActivationID:1, sourceMAC:"00:00:00:00:00:00", destinationMAC:"00:00:00:00:00:00", sourcePort:80, DestPort:443, flags:"SYN", frameLength:100, connectionID:1, Interface_and_protocol:"eth0" },
        
            ]
        },
        {
            Index: 3,
            connectionID: 1,
            ActivationID: 1,
            SourceIP:"192.168.1.1",
            DestinationIP:"192.168.10.1",
          
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
    
                { PacketID: 1, Size: 512, Timestamp: new Date(),SourceIP:"192.168.1.1", DestinationIP:"192.168.10.1", Protocol:"TCP", Payload:"GET / HTTP/1.1", ActivationID:1, sourceMAC:"00:00:00:00:00:00", destinationMAC:"00:00:00:00:00:00", sourcePort:80, DestPort:443, flags:"SYN", frameLength:100, connectionID:1, Interface_and_protocol:"eth0" },
        
            ]
        },
        {
            Index: 4,
            connectionID: 1,
            ActivationID: 1,
            SourceIP:"192.168.1.1",
            DestinationIP:"192.168.10.1",
          
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
    
                { PacketID: 1, Size: 512, Timestamp: new Date(),SourceIP:"192.168.1.1", DestinationIP:"192.168.10.1", Protocol:"TCP", Payload:"GET / HTTP/1.1", ActivationID:1, sourceMAC:"00:00:00:00:00:00", destinationMAC:"00:00:00:00:00:00", sourcePort:80, DestPort:443, flags:"SYN", frameLength:100, connectionID:1, Interface_and_protocol:"eth0" },
        
            ]
        },
        {
            Index: 5,
            connectionID: 1,
            ActivationID: 1,
            SourceIP:"192.168.1.1",
            DestinationIP:"192.168.10.1",
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
    
                { PacketID: 1, Size: 512, Timestamp: new Date(),SourceIP:"192.168.1.1", DestinationIP:"192.168.10.1", Protocol:"TCP", Payload:"GET / HTTP/1.1", ActivationID:1, sourceMAC:"00:00:00:00:00:00", destinationMAC:"00:00:00:00:00:00", sourcePort:80, DestPort:443, flags:"SYN", frameLength:100, connectionID:1, Interface_and_protocol:"eth0" },
        
            ]
        },
        {
            Index: 6,
            connectionID: 1,
            ActivationID: 1,
            SourceIP:"192.168.1.1",
            DestinationIP:"192.168.10.1",
          
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
    
                { PacketID: 1, Size: 512, Timestamp: new Date(),SourceIP:"192.168.1.1", DestinationIP:"192.168.10.1", Protocol:"TCP", Payload:"GET / HTTP/1.1", ActivationID:1, sourceMAC:"00:00:00:00:00:00", destinationMAC:"00:00:00:00:00:00", sourcePort:80, DestPort:443, flags:"SYN", frameLength:100, connectionID:1, Interface_and_protocol:"eth0" },
        
            ]
        },
        {
            Index: 7,
            connectionID: 1,
            ActivationID: 1,
            SourceIP:"192.168.1.1",
            DestinationIP:"192.168.10.1",
          
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
    
                { PacketID: 1, Size: 512, Timestamp: new Date(),SourceIP:"192.168.1.1", DestinationIP:"192.168.10.1", Protocol:"TCP", Payload:"GET / HTTP/1.1", ActivationID:1, sourceMAC:"00:00:00:00:00:00", destinationMAC:"00:00:00:00:00:00", sourcePort:80, DestPort:443, flags:"SYN", frameLength:100, connectionID:1, Interface_and_protocol:"eth0" },
        
            ]
        },
        // Other rows with similar structure
    ];


    // useEffect(() => {



    //     const socket = new WebSocket('ws://127.0.0.1:8080');

    //     socket.onopen = () => {
    //         console.log('Connected to server');
    //         setIsConnected(true);

    //         // Send a message to the server
    //         socket.send('Hello, server!');
    //     };

    //     socket.onmessage = (event: MessageEvent<string>) => {
    //         console.log(`Received from server: ${event.data}`);
    //         setMessages((prevMessages) => [...prevMessages, event.data]);
    //     };

    //     socket.onclose = () => {
    //         console.log('Disconnected from server');
    //         setIsConnected(false);
    //     };

    //     socket.onerror = (event: Event )=>{
    //         console.error(`WebSocket error: ${event}`);
    //     };
    

    //     // Clean up when the component unmounts
    //     return () => {
    //         socket.close();
    //     };
    // }, []);

    return (
        <div>
            <Header />
            <Sub_Header  />
            <Main_Comp rows={rows} />

            <h1>WebSocket Client</h1>
            <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}

export default Main;