"use strict";
// main.ts
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
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const websocket_server_1 = require("./websocket_server");
const file_watcher_1 = require("./file_watcher");
const interfaceIndex = '8'; // Replace with your interface index
const captureDirectory = path.join(__dirname, 'captures');
const baseFileName = 'capture';
const numberOfFiles = 10; // Number of files in the ring buffer
console.log('this is capture directory', captureDirectory);
const fileSize = 100; // Size of each file in kilobytes (100 MB)
fs.writeFileSync('tshark_output.log', ''); // Clear the tshark output log file
// Ensure the capture directory exists
if (!fs.existsSync(captureDirectory)) {
    fs.mkdirSync(captureDirectory);
}
// Start dumpcap with the specified configuration
const dumpcap = (0, child_process_1.spawn)('dumpcap', [
    '-i',
    interfaceIndex,
    '-b',
    `files:${numberOfFiles}`,
    '-b',
    `filesize:${fileSize}`,
    '-w',
    path.join(captureDirectory, `${baseFileName}.pcapng`),
]);
dumpcap.on('error', (error) => {
    console.error(`dumpcap error: ${error.message}`);
});
dumpcap.on('close', (code) => {
    console.log(`dumpcap process exited with code ${code}`);
});
// Start the WebSocket server
const wsServer = (0, websocket_server_1.startWebSocketServer)();
// Start the file watcher and pass the WebSocket server to it
(0, file_watcher_1.startFileWatcher)(captureDirectory, wsServer);
