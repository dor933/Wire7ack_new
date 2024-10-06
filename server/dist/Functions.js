"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTsharkInterfaces = getTsharkInterfaces;
exports.clearcapturedirectory = clearcapturedirectory;
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
function clearcapturedirectory(capturedirectory) {
    // Ensure the capture directory exists
    if (!fs_1.default.existsSync(capturedirectory)) {
        fs_1.default.mkdirSync(capturedirectory);
    }
    else {
        // Clear the capture directory
        fs_1.default.readdirSync(capturedirectory).forEach((file) => {
            fs_1.default.unlinkSync(path_1.default.join(capturedirectory, file));
        });
    }
    // Ensure the capture directory exists
}
