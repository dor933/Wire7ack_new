"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTsharkInterfaces = getTsharkInterfaces;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
async function getTsharkInterfaces() {
    try {
        // Execute the tshark -D command and await the result
        const { stdout } = await execAsync('tshark -D');
        // Process the output, split by lines, and filter out any empty lines
        const interfaces = stdout
            .trim()
            .split('\n')
            .filter(line => line !== '');
        return interfaces;
    }
    catch (error) {
        throw new Error(`Error executing tshark: ${error.message}`);
    }
}
