"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const ws_1 = require("ws");
const interfaceIndex = '5';
const Objects_Modules_1 = require("../Functions/Objects_Modules");
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
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
let Streams = [];
// Initialize the WebSocket client variable
let wsClient = null;
const logFilePath = 'tshark_output.log';
const errorLogFilePath = 'tshark_error.log';
// Create Write Streams
const logFile = fs.createWriteStream(logFilePath, { flags: 'a' }); // Append mode
const errorLogFile = fs.createWriteStream(errorLogFilePath, { flags: 'a' });
// Override console.log and console.error
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
console.log = function (...args) {
    originalConsoleLog.apply(console, args); // Log to console
    logFile.write(util.format(...args) + '\n'); // Write to log file
};
console.error = function (...args) {
    originalConsoleError.apply(console, args); // Log to console
    errorLogFile.write(util.format(...args) + '\n'); // Write to error log file
};
// Start the tshark process
const tshark = (0, child_process_1.spawn)('tshark', ['-i', interfaceIndex, '-T', 'ek']);
// Optional: Keep piping tshark outputs if desired
tshark.stdout.pipe(logFile);
tshark.stderr.pipe(errorLogFile);
tshark.on('close', (code) => {
    console.log(`tshark process exited with code ${code}`);
});
// Handle any errors with the spawn process
tshark.on('error', (error) => {
    console.error(`tshark error: ${error.message}`);
});
// Create the WebSocket server
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
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
tshark.stdout.on('data', async (dataChunk) => {
    dataBuffer += dataChunk;
    processBuffer();
});
let dataBuffer = '';
let linesBuffer = [];
function processBuffer() {
    let i = 0;
    while (i < dataBuffer.length) {
        if (dataBuffer[i] === '{') {
            let depth = 1;
            let j = i + 1;
            while (j < dataBuffer.length && depth > 0) {
                if (dataBuffer[j] === '{') {
                    depth++;
                }
                else if (dataBuffer[j] === '}') {
                    depth--;
                }
                j++;
            }
            if (depth === 0) {
                let jsonStr = dataBuffer.slice(i, j);
                linesBuffer.push(jsonStr);
                i = j;
            }
            else {
                // Incomplete JSON object, wait for more data
                break;
            }
        }
        else {
            i++;
        }
    }
    dataBuffer = dataBuffer.slice(i);
    while (linesBuffer.length >= 2) {
        const indexLine = linesBuffer.shift();
        const dataLine = linesBuffer.shift();
        processPacket(indexLine, dataLine);
    }
}
async function processPacket(indexLine, dataLine) {
    // Parse the JSON strings
    try {
        if (typeof indexLine !== 'string' || typeof dataLine !== 'string') {
            console.log('are not strings');
            console.log('indexLine:', indexLine);
            console.log('dataLine:', dataLine);
        }
        const indexObj = await JSON.parse(indexLine);
        const dataObj = await JSON.parse(dataLine);
        // Combine the two objects
        const fullobj = await { ...indexObj, ...dataObj };
        console.log('this is fullobj:', fullobj);
        const packet = await (0, Objects_Modules_1.From_Wireshark_To_PacketObject)(fullobj);
        console.log('Packet:', packet);
        // Determine the stream ID from packet properties
        const streamID = packet.connectionID;
        let streamtosend;
        // Find the existing Stream object in Streams array
        let stream = Streams.find(s => s.connectionID === streamID);
        if (!stream) {
            if (Streams.length == 0) {
                stream = (0, Objects_Modules_1.Create_Stream)(packet.connectionID, packet.ActivationID, packet.Protocol, true, packet.Timestamp, packet.Timestamp, 0, 0, BigInt(0), packet.Protocol);
                Streams.push(stream);
                return;
            }
            else {
                streamtosend = Streams[index++];
                stream = (0, Objects_Modules_1.Create_Stream)(packet.connectionID, packet.ActivationID, packet.Protocol, true, packet.Timestamp, packet.Timestamp, 0, 0, BigInt(0), packet.Protocol);
                Streams.push(stream);
            }
            await (0, Objects_Modules_1.Check_Stream_Validity)(streamtosend);
            let streamData = JSON.stringify(streamtosend);
            if (wsClient && wsClient.readyState === ws_1.WebSocket.OPEN) {
                await wsClient.send(streamData); // Send the stream data to the client
                console.log(`Sent stream data to client: ${streamData}`);
            }
        }
        else {
            (0, Objects_Modules_1.Assign_Packet_To_Stream)(packet, Streams);
        }
    }
    catch (error) {
        console.log('indexLine Error:', indexLine);
        console.log('dataLine Error:', dataLine);
    }
}
