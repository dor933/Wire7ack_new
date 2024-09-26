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
    const [messages, setMessages] = (0, react_1.useState)([]);
    const { isCaptureStarted, setIsCaptureStarted } = (0, Global_1.useGlobal)();
    const { isConnectionopen, setIsConnectionopen } = (0, Global_1.useGlobal)();
    const streamsRef = (0, react_1.useRef)([]);
    const messagesRef = (0, react_1.useRef)([]);
    (0, react_1.useEffect)(() => {
        const socket = new WebSocket('ws://127.0.0.1:8080');
        socket.onopen = () => {
            console.log('Connected to server');
            setIsConnectionopen(true);
            // Send a message to the server
            socket.send('Hello, server!');
        };
        socket.onmessage = (event) => {
            // Parse the incoming message
            let Data = JSON.parse(event.data);
            //check if its stream object
            let stream = new Stream_1.Stream(Data.Index, Data.connectionID, Data.SourceIP, Data.DestinationIP, Data.ActivationID, Data.Packets, Data.Protocol, Data.validity, new Date(Data.StartTime), new Date(Data.EndTime), Data.Duration, Data.PacketCount, BigInt(Data.DataVolume), Data.ApplicationProtocol);
            // Accumulate streams and messages
            streamsRef.current.push(stream);
            messagesRef.current.push(event.data);
            // Create a Stream object
        };
        socket.onclose = () => {
            console.log('Disconnected from server');
            setIsConnectionopen(false);
        };
        socket.onerror = (event) => {
            console.error(`WebSocket error: ${event}`);
        };
        // Set up interval to update state every second
        const interval = setInterval(() => {
            if (streamsRef.current.length > 0) {
                console.log('this is the streams array', streams);
                //search for the stream in the streams array and if exist replace the old stream with the new one
                streamsRef.current.forEach((stream) => {
                    let Stream_relevant = streams.find((stream) => stream.connectionID === stream.connectionID && stream.Protocol === stream.Protocol && stream.ActivationID === stream.ActivationID);
                    if (Stream_relevant) {
                        let index = streams.indexOf(Stream_relevant);
                        setStreams((prevStreams) => [...prevStreams.slice(0, index), stream, ...prevStreams.slice(index + 1)]);
                    }
                    else {
                        setStreams((prevStreams) => [...prevStreams, stream]);
                    }
                });
                streamsRef.current = [];
            }
            if (messagesRef.current.length > 0) {
                setMessages((prevMessages) => [...prevMessages, ...messagesRef.current]);
                messagesRef.current = [];
            }
        }, 1000); // Update every 1 second
        // Clean up when the component unmounts
        return () => {
            socket.close();
            clearInterval(interval);
        };
    }, []);
    (0, react_1.useEffect)(() => {
    }, [streams]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Sub_Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main_Comp_1.default, { rows: streams, setrows: setStreams }), (0, jsx_runtime_1.jsx)("h1", { children: "WebSocket Client" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Status: ", isConnectionopen ? 'Connected' : 'Disconnected'] }), (0, jsx_runtime_1.jsx)("ul", { children: messages.map((message, index) => ((0, jsx_runtime_1.jsx)("li", { children: message }, index))) })] }));
};
exports.default = Main;
