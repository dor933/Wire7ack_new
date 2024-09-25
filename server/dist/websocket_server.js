"use strict";
// websocket_server.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebSocketServer = startWebSocketServer;
const ws_1 = require("ws");
function startWebSocketServer() {
    const wss = new ws_1.WebSocketServer({ port: 8080 });
    wss.on('connection', (ws) => {
        console.log('New client connected');
        ws.on('message', (message) => {
            console.log(`Received message from client: ${message}`);
        });
        ws.on('close', () => {
            console.log('Client disconnected');
        });
        ws.on('error', (error) => {
            console.error(`WebSocket error: ${error.message}`);
        });
    });
    return wss;
}
