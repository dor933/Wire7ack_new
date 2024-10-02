import { exec } from 'child_process';
import { promisify } from 'util';

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

export { getTsharkInterfaces };