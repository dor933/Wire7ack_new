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
import { getDbConnection } from './dbConnection';
import { Activation } from './shared/Activation';
import { writeActivationToDb } from './dbops';

let dumpcap: ChildProcessWithoutNullStreams | null = null;
export let currentactivation:Activation|null=null;// Define dumpcap globally

export const startMainProcess = async (interfacename:string,fields:Record<string,string>) => {

  const dbConnection = await getDbConnection();
  console.log('this is db connection', dbConnection);
  //find the ip host 1 key in the fields object
  const [iphost1,iphost2,iphost3,iphost4]=Object.values(fields).filter(value => value.length > 0);
  const activation= new Activation(0,0,new Date(Date.now()),new Date(Date.now()),"","",iphost1||"",iphost2||"",iphost3||"",iphost4||"","");
  currentactivation= await writeActivationToDb(dbConnection,activation)
  console.log('this is current activation', currentactivation)

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

for (const obj of Object.entries(fields)) {
  if (obj.length > 0) {
    switch (obj[0].toLowerCase()) {
      case 'ip host 1':
      case 'ip host 2': {
        // For source or destination IP, we create an IP filter that matches either direction.
        
          ipFilterParts.push(`host ${obj[1]}`);
        
        break;
      }
      case 'protocol': {
        const protocolFilter = obj[1];
        filterParts.push(`proto (${protocolFilter})`);
        break;
      }
      default:
        console.warn(`Unsupported filter key: ${obj[0]}`);
        break;
    }
  }
}

// Combine IP filters using 'or' to match any of the IPs as source or destination
if (ipFilterParts.length > 0) {
  filterParts.push(`(${ipFilterParts.join(' or ')})`);
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
startFileWatcher(captureDirectory, wsServer, dbConnection);

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