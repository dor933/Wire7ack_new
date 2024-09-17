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

tshark.stdout.setEncoding('utf8');

tshark.stdout.on('data', async (dataChunk: string) => {
    dataBuffer += dataChunk;
    processBuffer();
});


let dataBuffer = '';
let linesBuffer: string[] = [];

function processBuffer() {
    let i = 0;
    while (i < dataBuffer.length) {
        if (dataBuffer[i] === '{') {
            let depth = 1;
            let j = i + 1;
            while (j < dataBuffer.length && depth > 0) {
                if (dataBuffer[j] === '{') {
                    depth++;
                } else if (dataBuffer[j] === '}') {
                    depth--;
                }
                j++;
            }
            if (depth === 0) {
                let jsonStr = dataBuffer.slice(i, j);
                linesBuffer.push(jsonStr);
                i = j;
            } else {
                // Incomplete JSON object, wait for more data
                break;
            }
        } else {
            i++;
        }
    }
    dataBuffer = dataBuffer.slice(i);

    while (linesBuffer.length >= 2) {
        const indexLine = linesBuffer.shift();
        const dataLine = linesBuffer.shift();

        processPacket(indexLine!, dataLine!);
    }
}

async function processPacket(indexLine: string, dataLine: string) {
       
        // Parse the JSON strings
        try {

           
        
           if(typeof indexLine!=='string' || typeof dataLine!=='string'){
            console.log('are not strings');
            console.log('indexLine:', indexLine);
            console.log('dataLine:', dataLine);
           }

            const indexObj = await JSON.parse(indexLine);
            const dataObj = await JSON.parse(dataLine);
           

    
           
    
            // Combine the two objects
            const fullobj = await { ...indexObj, ...dataObj };
            console.log('this is fullobj:', fullobj);
            

            const packet: Packet = await From_Wireshark_To_PacketObject(fullobj);

            console.log('Packet:', packet);

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
            console.log('indexLine Error:', indexLine);
            console.log('dataLine Error:', dataLine);
        }
    
}
