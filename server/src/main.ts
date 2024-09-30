// main.ts

import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { startWebSocketServer } from './websocket_server';
import { startFileWatcher } from './file_watcher';
import { WebSocketServer } from 'ws';

const interfaceIndex = '8'; // Replace with your interface index
const captureDirectory = path.join(__dirname, 'captures');
const baseFileName = 'capture';
const numberOfFiles = 10; // Number of files in the ring buffer

console.log('this is capture directory', captureDirectory);
const fileSize = 10000; // Size of each file in kilobytes (100 MB)

fs.writeFileSync('tshark_output.log', ''); // Clear the tshark output log file

// Ensure the capture directory exists
if (!fs.existsSync(captureDirectory)) {
  fs.mkdirSync(captureDirectory);
}

// Start dumpcap with the specified configuration
const dumpcap = spawn('dumpcap', [
  '-i',
  interfaceIndex,
  '-b',
  `files:${numberOfFiles}`,
  '-b',
  `filesize:${fileSize}`,
  '-w',
  path.join(captureDirectory, `${baseFileName}.pcapng`),
]);

dumpcap.on('error', (error: Error) => {
  console.error(`dumpcap error: ${error.message}`);
});

dumpcap.on('close', (code: number) => {
  console.log(`dumpcap process exited with code ${code}`);
});

// Start the WebSocket server
const wsServer: WebSocketServer = startWebSocketServer();

// Start the file watcher and pass the WebSocket server to it
startFileWatcher(captureDirectory, wsServer);
