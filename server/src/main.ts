// main.ts

import { spawn , exec} from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { startFileWatcher } from './file_watcher';
import { getTsharkInterfaces } from './Functions';
import { wsServer } from './server';
import { ChildProcessWithoutNullStreams } from 'child_process';
import { clearcapturedirectory } from './Functions';
import { getDbConnection } from './dbConnection';
import { Activation } from './shared/Activation';
import { writeActivationToDb } from './dbops';
import { promisify } from 'util';
import logger from './logger';
const execAsync = promisify(exec);


let dumpcap: ChildProcessWithoutNullStreams | null = null;
export let currentactivation:Activation|null=null;// Define dumpcap globally
let isShuttingDown = false;
export let iscapturing=false;
let heartbeatInterval: NodeJS.Timeout | null = null;

const HEARTBEAT_INTERVAL = 300000;

const isProcessRunning = async (pid: number): Promise<boolean> => {
  try {
    if (process.platform === 'win32') {
      // For Windows
      const { stdout } = await execAsync(`tasklist /FI "PID eq ${pid}" /FO CSV /NH`);
      return stdout.includes(`${pid}`);
    } else {
      // For Unix-based systems (Linux, macOS)
      await execAsync(`ps -p ${pid}`);
      return true;
    }
  } catch (error) {
    return false; // Process not found
  }
};

const startDumpcap = (interfaceIndex: string, captureDirectory: string, baseFileName: string, numberOfFiles: number, fileSize: number, filterString: string) => {
  dumpcap = spawn('dumpcap', [
    '-i', interfaceIndex,
    '-b', `files:${numberOfFiles}`,
    '-b', `filesize:${fileSize}`,
    '-f', filterString,
    '-w', path.join(captureDirectory, `${baseFileName}.pcapng`),
  ]);

  iscapturing=true;

  dumpcap.stdout.on('data', (data) => {
    console.log(`dumpcap stdout: ${data}`);
  });


  dumpcap.on('error', (error: Error) => {
    
    console.error(`dumpcap error: ${error.message}`);
  });

  dumpcap.on('close', async (code: number) => {
    console.log(`dumpcap process exited with code ${code}`);
    iscapturing=false;
    stopHeartbeat();
    if (!isShuttingDown) {
      console.log('Attempting to restart dumpcap...');
        // Wait for 5 seconds before restarting
        await new Promise(resolve => setTimeout(resolve, 5000));
      startDumpcap(interfaceIndex, captureDirectory, baseFileName, numberOfFiles, fileSize, filterString);
    }
  });

  startHeartbeat();
};
const startHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
  }
  heartbeatInterval = setInterval(async () => {
    if (dumpcap && dumpcap.pid) {
      const isRunning = await isProcessRunning(dumpcap.pid);
      if (!isRunning) {
        console.error('dumpcap process is not running. Restarting...');
        iscapturing=false;
        restartDumpcap();
      } else {
        console.log('dumpcap process is still running.');
      }
    }
  }, HEARTBEAT_INTERVAL);
};

const stopHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
};

const restartDumpcap = () => {
  if (dumpcap) {
    dumpcap.kill('SIGKILL'); // Force kill the process
    dumpcap = null;
  }
  // The process will be restarted by the 'close' event handler
};



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
  const numberOfFiles = 10;
  const fileSize = 3000;

  console.log('this is capture directory', captureDirectory);
  fs.writeFileSync('tshark_output.log', '');
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

  isShuttingDown = false;
  startDumpcap(interfaceIndex, captureDirectory, baseFileName, numberOfFiles, fileSize, filterString);

  // Start the file watcher and pass the WebSocket server to it
  startFileWatcher(captureDirectory, wsServer, dbConnection);

  return "Main process started successfully";


// Start dumpcap with the specified configuration

}

export const stopMainProcess = () => {
  isShuttingDown = true;
  stopHeartbeat();
  if (dumpcap) {
    dumpcap.kill('SIGINT');
    dumpcap = null;
    console.log('Main process stopped successfully');
  } else {
    console.log('No running process to stop');
  }
};