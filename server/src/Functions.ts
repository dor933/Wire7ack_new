import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { Stream } from './shared/Stream';
import { Packet } from './shared/Packet';
import { getDbConnection } from './dbConnection';
import { Activation } from './shared/Activation';
const os = require('os');
const networkInterfaces = os.networkInterfaces();
let ipv4Address = '';

function getipv4address(): string {
  Object.keys(networkInterfaces).forEach((key) => {
    networkInterfaces[key].forEach((item:any) => {
      if (item.family === 'IPv4' && !item.internal) {
        ipv4Address = item.address;
      }
    });
  });
  return ipv4Address;
}

const execAsync = promisify(exec);

async function getTsharkInterfaces(): Promise<string[]> {
  try {
    // Execute the tshark -D command and await the result
    const { stdout } = await execAsync('tshark -D');

    // Process the output, split by lines, and filter out any empty lines
    const interfaces = stdout
      .trim()
      .split('\n')
      .filter(line => line !== '');

    return interfaces;
  } catch (error) {
    throw new Error(`Error executing tshark: ${(error as Error).message}`);
  }
}

function clearcapturedirectory(capturedirectory:string){
// Ensure the capture directory exists
if (!fs.existsSync(capturedirectory)) {
    fs.mkdirSync(capturedirectory);
  }
  else{
    // Clear the capture directory
    fs.readdirSync(capturedirectory).forEach((file) => {
      fs.unlinkSync(path.join(capturedirectory, file));
    });
  }
  // Ensure the capture directory exists
}



export { getTsharkInterfaces,clearcapturedirectory,getipv4address };
