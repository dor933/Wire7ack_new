const { spawn } = require('child_process');
import { WebSocketServer, WebSocket } from 'ws';
const interfaceIndex: String = '8';
import {Packet} from '../shared/Packet';
import {Stream} from 'stream';

const Streams: Stream[] = [];



// Start the tshark process
const tshark = spawn('tshark', ['-i', interfaceIndex, '-T', 'json']);

// Handle errors
tshark.stderr.on('data', (data: Buffer) => {
    console.error(`tshark stderr: ${data}`);
});

// Handle process exit
tshark.on('close', (code:Number) => {
    console.log(`tshark process exited with code ${code}`);
});

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');

    ws.send('Hello from server');
    let dataBuffer = '';

    tshark.stdout.on('data', (data: Buffer) => {
        dataBuffer += data.toString('utf8');

        console.log(`Received data from tshark: ${dataBuffer}`);

        // Send data only if there is content to send
        if (dataBuffer.length > 0) {
            if (ws.readyState === WebSocket.OPEN) {
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
