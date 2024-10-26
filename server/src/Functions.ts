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
      if (item.family === 'IPv4' && !item.internal && !item.address.startsWith('172.')) {
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

//write a function that detect if the only error in the stream is the last packet with rst flag, if so then return only the last 4 packets
function detectError(stream:Stream):boolean{
  let errorCount=0;
  stream.Packets.forEach((packet)=>{
    if(packet.errorIndicator){
      errorCount++;
    }
  });
  
  if(errorCount===1 && stream.Packets[stream.Packets.length-1].errorIndicator){
    return true;
  } 

  return false;
}



export { getTsharkInterfaces,clearcapturedirectory,getipv4address,detectError };
