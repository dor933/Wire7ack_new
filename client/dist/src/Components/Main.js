"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Header_1 = __importDefault(require("./Header"));
const Main = () => {
    const [message, setMessage] = (0, react_1.useState)('');
    const [isConnected, setIsConnected] = (0, react_1.useState)(false);
    const [messages, setMessages] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        //delay function
        // Connect to the WebSocket server
        const socket = new WebSocket('ws://127.0.0.1:8080');
        socket.onopen = () => {
            console.log('Connected to server');
            setIsConnected(true);
            // Send a message to the server
            socket.send('Hello, server!');
        };
        socket.onmessage = (event) => {
            console.log(`Received from server: ${event.data}`);
            setMessages((prevMessages) => [...prevMessages, event.data]);
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
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)("h1", { children: "WebSocket Client" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Status: ", isConnected ? 'Connected' : 'Disconnected'] }), (0, jsx_runtime_1.jsx)("ul", { children: messages.map((message, index) => ((0, jsx_runtime_1.jsx)("li", { children: message }, index))) })] }));
};
exports.default = Main;
