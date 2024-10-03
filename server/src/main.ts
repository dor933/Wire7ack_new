// main.ts

import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { startWebSocketServer } from './websocket_server';
import { startFileWatcher } from './file_watcher';
import { getTsharkInterfaces } from './Functions';
import { WebSocketServer } from 'ws';
import { wsServer } from './server';

export const startMainProcess = async (interfacename:string) => {

  const tsharkInterfaces = await getTsharkInterfaces();
  console.log('this is tshark interfaces', tsharkInterfaces);
  console.log('this is interface name', interfacename);
  //find the interface index
  let interfaceIndex = '';

  for (let i = 0; i < tsharkInterfaces.length; i++) {
    if (tsharkInterfaces[i].includes(interfacename)) {
      interfaceIndex = tsharkInterfaces[i].split(' ')[0];
      interfaceIndex = interfaceIndex.replace('.', '');
      break;
    }
  }

  

  console.log('this is interface index', interfaceIndex);
const captureDirectory = path.join(__dirname, 'captures');
const baseFileName = 'capture';
const numberOfFiles = 10; // Number of files in the ring buffer

console.log('this is capture directory', captureDirectory);
const fileSize = 3000; // Size of each file in kilobytes (100 MB)

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
  '-f',
   'host 10.0.0.10', // Correct capture filter syntax
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

// Start the file watcher and pass the WebSocket server to it
startFileWatcher(captureDirectory, wsServer);

return "Main process started successfully";
}
