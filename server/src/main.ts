// main.ts

import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { startWebSocketServer } from './websocket_server';
import { startFileWatcher } from './file_watcher';
import { WebSocketServer } from 'ws';

export const startMainProcess = () => {
const interfaceIndex = '5'; // Replace with your interface index
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
else{
  // Clear the capture directory
  fs.readdirSync(captureDirectory).forEach((file) => {
    fs.unlinkSync(path.join(captureDirectory, file));
  });
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
   // Example: Filter packets with destination IP 192.168.1.100
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

return "Main process started successfully";
}
