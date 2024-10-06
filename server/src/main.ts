// main.ts

import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { startWebSocketServer } from './websocket_server';
import { startFileWatcher } from './file_watcher';
import { getTsharkInterfaces } from './Functions';
import { WebSocketServer } from 'ws';
import { wsServer } from './server';
import { ChildProcessWithoutNullStreams } from 'child_process';
import { clearcapturedirectory } from './Functions';

let dumpcap: ChildProcessWithoutNullStreams | null = null; // Define dumpcap globally

export const startMainProcess = async (interfacename:string,fields:Record<string,string[]>) => {

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
clearcapturedirectory(captureDirectory);

let filterParts: string[] = [];
let ipFilterParts: string[] = [];

for (const [key, values] of Object.entries(fields)) {
    if (values.length > 0) {
      const keyFilter = values.map((value) => {
        switch (key.toLowerCase()) {
          case 'ip host 1':
          case 'ip host 2': {
            values.forEach((value) => {
              ipFilterParts.push(`host ${value}`);

            });
            break;

          }
          case 'protocol':
            return `proto ${value}`;
          default:
            console.warn(`Unsupported filter key: ${key}`);
            return null;
        }
        }  ).filter(Boolean); // Remove any nulls if key is unsupported

      if (keyFilter.length > 0) {
        filterParts.push(`(${keyFilter.join(' or ')})`);
      }
    }
  }

  // Join all filter parts with 'and' to construct the complete filter
  const filterString = filterParts.join(' and ');
  console.log('Generated filter string:', filterString);

// Start dumpcap with the specified configuration
 dumpcap = spawn('dumpcap', [
  '-i',
  interfaceIndex,
  '-b',
  `files:${numberOfFiles}`,
  '-b',
  `filesize:${fileSize}`,
  '-f',
   filterString,
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

export const stopMainProcess = () => {
  if (dumpcap) {
    dumpcap.kill('SIGINT'); // Send SIGINT to stop dumpcap gracefully
    dumpcap = null; // Clear the reference
    console.log('Main process stopped successfully');
  } else {
    console.log('No running process to stop');
  }
};