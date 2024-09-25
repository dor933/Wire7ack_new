"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Header_1 = __importDefault(require("./Header"));
const Sub_Header_1 = __importDefault(require("./Sub_Header"));
const Main_Comp_1 = __importDefault(require("./Main_Comp"));
const Global_1 = require("./Context/Global");
const Stream_1 = require("../shared/Stream");
const Main = () => {
    const [streams, setStreams] = (0, react_1.useState)([]);
    const [message, setMessage] = (0, react_1.useState)('');
    const [isConnected, setIsConnected] = (0, react_1.useState)(false);
    const [messages, setMessages] = (0, react_1.useState)([]);
    const { isCaptureStarted, setIsCaptureStarted } = (0, Global_1.useGlobal)();
    const { isConnectionopen, setIsConnectionopen } = (0, Global_1.useGlobal)();
    const rows = [
        {
            Index: 1,
            connectionID: 1,
            ActivationID: 1,
            SourceIP: "192.168.1.1",
            DestinationIP: "192.168.10.1",
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
                { PacketID: 1, Size: 512, Timestamp: new Date(), SourceIP: "192.168.1.1", DestinationIP: "192.168.10.1", Protocol: "TCP", Payload: "GET / HTTP/1.1", ActivationID: 1, sourceMAC: "00:00:00:00:00:00", destinationMAC: "00:00:00:00:00:00", sourcePort: 80, DestPort: 443, flags: "SYN", frameLength: 100, connectionID: 1, Interface_and_protocol: "eth0" },
            ]
        },
        {
            Index: 2,
            connectionID: 1,
            ActivationID: 1,
            SourceIP: "192.168.1.1",
            DestinationIP: "192.168.10.1",
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
                { PacketID: 1, Size: 512, Timestamp: new Date(), SourceIP: "192.168.1.1", DestinationIP: "192.168.10.1", Protocol: "TCP", Payload: "GET / HTTP/1.1", ActivationID: 1, sourceMAC: "00:00:00:00:00:00", destinationMAC: "00:00:00:00:00:00", sourcePort: 80, DestPort: 443, flags: "SYN", frameLength: 100, connectionID: 1, Interface_and_protocol: "eth0" },
            ]
        },
        {
            Index: 3,
            connectionID: 1,
            ActivationID: 1,
            SourceIP: "192.168.1.1",
            DestinationIP: "192.168.10.1",
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
                { PacketID: 1, Size: 512, Timestamp: new Date(), SourceIP: "192.168.1.1", DestinationIP: "192.168.10.1", Protocol: "TCP", Payload: "GET / HTTP/1.1", ActivationID: 1, sourceMAC: "00:00:00:00:00:00", destinationMAC: "00:00:00:00:00:00", sourcePort: 80, DestPort: 443, flags: "SYN", frameLength: 100, connectionID: 1, Interface_and_protocol: "eth0" },
            ]
        },
        {
            Index: 4,
            connectionID: 1,
            ActivationID: 1,
            SourceIP: "192.168.1.1",
            DestinationIP: "192.168.10.1",
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
                { PacketID: 1, Size: 512, Timestamp: new Date(), SourceIP: "192.168.1.1", DestinationIP: "192.168.10.1", Protocol: "TCP", Payload: "GET / HTTP/1.1", ActivationID: 1, sourceMAC: "00:00:00:00:00:00", destinationMAC: "00:00:00:00:00:00", sourcePort: 80, DestPort: 443, flags: "SYN", frameLength: 100, connectionID: 1, Interface_and_protocol: "eth0" },
            ]
        },
        {
            Index: 5,
            connectionID: 1,
            ActivationID: 1,
            SourceIP: "192.168.1.1",
            DestinationIP: "192.168.10.1",
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
                { PacketID: 1, Size: 512, Timestamp: new Date(), SourceIP: "192.168.1.1", DestinationIP: "192.168.10.1", Protocol: "TCP", Payload: "GET / HTTP/1.1", ActivationID: 1, sourceMAC: "00:00:00:00:00:00", destinationMAC: "00:00:00:00:00:00", sourcePort: 80, DestPort: 443, flags: "SYN", frameLength: 100, connectionID: 1, Interface_and_protocol: "eth0" },
            ]
        },
        {
            Index: 6,
            connectionID: 1,
            ActivationID: 1,
            SourceIP: "192.168.1.1",
            DestinationIP: "192.168.10.1",
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
                { PacketID: 1, Size: 512, Timestamp: new Date(), SourceIP: "192.168.1.1", DestinationIP: "192.168.10.1", Protocol: "TCP", Payload: "GET / HTTP/1.1", ActivationID: 1, sourceMAC: "00:00:00:00:00:00", destinationMAC: "00:00:00:00:00:00", sourcePort: 80, DestPort: 443, flags: "SYN", frameLength: 100, connectionID: 1, Interface_and_protocol: "eth0" },
            ]
        },
        {
            Index: 7,
            connectionID: 1,
            ActivationID: 1,
            SourceIP: "192.168.1.1",
            DestinationIP: "192.168.10.1",
            Protocol: "TCP",
            validity: true,
            StartTime: new Date(),
            EndTime: new Date(),
            DataVolume: BigInt(100),
            PacketCount: 1,
            Duration: 100,
            ApplicationProtocol: "HTTP",
            Packets: [
                { PacketID: 1, Size: 512, Timestamp: new Date(), SourceIP: "192.168.1.1", DestinationIP: "192.168.10.1", Protocol: "TCP", Payload: "GET / HTTP/1.1", ActivationID: 1, sourceMAC: "00:00:00:00:00:00", destinationMAC: "00:00:00:00:00:00", sourcePort: 80, DestPort: 443, flags: "SYN", frameLength: 100, connectionID: 1, Interface_and_protocol: "eth0" },
            ]
        },
        // Other rows with similar structure
    ];
    (0, react_1.useEffect)(() => {
        const socket = new WebSocket('ws://127.0.0.1:8080');
        socket.onopen = () => {
            console.log('Connected to server');
            setIsConnected(true);
            // Send a message to the server
            socket.send('Hello, server!');
        };
        socket.onmessage = (event) => {
            console.log(`Received from server: ${event.data}`);
            //convert it to stream object
            let streamData = JSON.parse(event.data);
            let stream = new Stream_1.Stream(streamData.Index, streamData.connectionID, streamData.SourceIP, streamData.DestinationIP, streamData.ActivationID, streamData.Packets, streamData.Protocol, streamData.validity, streamData.StartTime, streamData.EndTime, streamData.Duration, streamData.PacketCount, streamData.DataVolume, streamData.ApplicationProtocol);
            setStreams((prevStreams) => [...prevStreams, stream]);
            setMessages((prevMessages) => [...prevMessages, event.data]);
            console.log(streams);
        };
        socket.onclose = () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        };
        socket.onerror = (event) => {
            console.error(`WebSocket error: ${event}`);
        };
        // Clean up when the component unmounts
        return () => {
            socket.close();
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Sub_Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main_Comp_1.default, { rows: streams }), (0, jsx_runtime_1.jsx)("h1", { children: "WebSocket Client" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Status: ", isConnected ? 'Connected' : 'Disconnected'] }), (0, jsx_runtime_1.jsx)("ul", { children: messages.map((message, index) => ((0, jsx_runtime_1.jsx)("li", { children: message }, index))) })] }));
};
exports.default = Main;
