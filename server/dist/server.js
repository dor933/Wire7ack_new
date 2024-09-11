"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { spawn } = require('child_process');
const ws_1 = require("ws"); // Define the interface index and output file
const interfaceIndex = '8'; // Replace '5' with the correct interface number
// Start the tshark process
const tshark = spawn('tshark', ['-i', interfaceIndex, '-T', 'json']);
// Handle errors
tshark.stderr.on('data', (data) => {
    console.error(`tshark stderr: ${data}`);
});
// Handle process exit
tshark.on('close', (code) => {
    console.log(`tshark process exited with code ${code}`);
});
const wss = new ws_1.Server({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send('Hello from server');
    let dataBuffer = '';
    tshark.stdout.on('data', (data) => {
        dataBuffer += data.toString('utf8');
        console.log(`Received data from tshark: ${dataBuffer}`);
        // Send data only if there is content to send
        if (dataBuffer.length > 0) {
            if (ws.readyState === ws_1.WebSocket.OPEN) {
                console.log(`Sending data to client: ${dataBuffer}`);
                ws.send(dataBuffer);
            }
            dataBuffer = ''; // Clear the buffer after sending
        }
    });
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});
