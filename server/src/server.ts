import { spawn } from 'child_process';
import { WebSocketServer, WebSocket } from 'ws';
const interfaceIndex: string = '5';
import { Packet } from '../../shared/Packet';
import { Stream } from '../../shared/Stream'; // Ensure correct import
import { Create_Stream, Assign_Packet_To_Stream, From_Wireshark_To_PacketObject, Check_Stream_Validity } from '../Functions/Objects_Modules';
import * as fs from 'fs';
import * as util from 'util';
import * as sql from 'mssql';

let index = 0;

const sqlConfig = {
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
    server: 'your_server',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Initialize the Streams array
let Streams: Stream[] = [];
// Initialize the WebSocket client variable
let wsClient: WebSocket | null = null;

const logFilePath = 'tshark_output.log';
const errorLogFilePath = 'tshark_error.log';

// Create Write Streams
const logFile = fs.createWriteStream(logFilePath, { flags: 'a' }); // Append mode
const errorLogFile = fs.createWriteStream(errorLogFilePath, { flags: 'a' });

// Override console.log and console.error
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = function (...args: any[]) {
    originalConsoleLog.apply(console, args); // Log to console
    logFile.write(util.format(...args) + '\n'); // Write to log file
};

console.error = function (...args: any[]) {
    originalConsoleError.apply(console, args); // Log to console
    errorLogFile.write(util.format(...args) + '\n'); // Write to error log file
};

// Start the tshark process
const tshark = spawn('tshark', ['-i', interfaceIndex, '-T', 'ek']);

// Optional: Keep piping tshark outputs if desired
tshark.stdout.pipe(logFile);
tshark.stderr.pipe(errorLogFile);

tshark.on('close', (code: number) => {
    console.log(`tshark process exited with code ${code}`);
});

// Handle any errors with the spawn process
tshark.on('error', (error: Error) => {
    console.error(`tshark error: ${error.message}`);
});

// Create the WebSocket server
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
    wsClient = ws; // Assign the connected client to wsClient variable

    ws.send('Hello from server');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        wsClient = null; // Reset wsClient when client disconnects
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});

// Remove the readline interface
// Instead, read data chunks from tshark.stdout
let dataBuffer = '';

tshark.stdout.setEncoding('utf8');

tshark.stdout.on('data', async (dataChunk: string) => {
    dataBuffer += dataChunk;
    processBuffer();
});

function processBuffer() {
    // Replace occurrences of '}{'index' with '}|SPLIT|{"index":'
    const splitData = dataBuffer.replace(/}\s*{\s*"index":/g, '}|SPLIT|{"index":');

    // Split the data into packet strings
    const packetsArray = splitData.split('|SPLIT|');

    // The last element may be incomplete, so save it back to dataBuffer
    dataBuffer = packetsArray.pop() || '';

    for (const packetString of packetsArray) {
        processPacket(packetString);
    }
}

async function processPacket(packetString: string) {
    // Match the index and data parts
    const match = packetString.match(/^(\{"index":\{.*?\}\})(\{.*\})$/s);
    if (match) {
        const indexString = match[1];
        const dataString = match[2];
        // Parse the JSON strings
        try {
            const indexObj = JSON.parse(indexString);
            const dataObj = JSON.parse(dataString);
            // Now process the packet
            console.log('Index:', indexObj);
            console.log('Data:', dataObj);

            const packet: Packet = From_Wireshark_To_PacketObject(dataObj);

            // Determine the stream ID from packet properties
            const streamID = packet.connectionID;
            let streamtosend: Stream;

            // Find the existing Stream object in Streams array
            let stream = Streams.find(s => s.connectionID === streamID);

            if (!stream) {
                if (Streams.length == 0) {
                    stream = Create_Stream(packet.connectionID, packet.ActivationID, packet.Protocol, true, packet.Timestamp, packet.Timestamp, 0, 0, BigInt(0), packet.Protocol);
                    Streams.push(stream);
                    return;
                } else {
                    streamtosend = Streams[index++];
                    stream = Create_Stream(packet.connectionID, packet.ActivationID, packet.Protocol, true, packet.Timestamp, packet.Timestamp, 0, 0, BigInt(0), packet.Protocol);
                    Streams.push(stream);
                }

                await Check_Stream_Validity(streamtosend);
                let streamData = JSON.stringify(streamtosend);

                if (wsClient && wsClient.readyState === WebSocket.OPEN) {
                    await wsClient.send(streamData); // Send the stream data to the client
                    console.log(`Sent stream data to client: ${streamData}`);
                }

            } else {
                Assign_Packet_To_Stream(packet, Streams);
            }
        } catch (error) {
            console.error(`Error parsing JSON: ${error}`);
        }
    } else {
        console.error('Failed to parse packet:', packetString);
    }
}
