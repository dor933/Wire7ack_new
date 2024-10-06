"use strict";
// main.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopMainProcess = exports.startMainProcess = void 0;
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const file_watcher_1 = require("./file_watcher");
const Functions_1 = require("./Functions");
const server_1 = require("./server");
const Functions_2 = require("./Functions");
let dumpcap = null; // Define dumpcap globally
const startMainProcess = async (interfacename, fields) => {
    const tsharkInterfaces = await (0, Functions_1.getTsharkInterfaces)();
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
    (0, Functions_2.clearcapturedirectory)(captureDirectory);
    let filterParts = [];
    let ipFilterParts = [];
    for (const [key, values] of Object.entries(fields)) {
        if (values.length > 0) {
            switch (key.toLowerCase()) {
                case 'ip host 1':
                case 'ip host 2': {
                    // For source or destination IP, we create an IP filter that matches either direction.
                    values.forEach((value) => {
                        ipFilterParts.push(`host ${value}`);
                    });
                    break;
                }
                case 'protocol': {
                    const protocolFilter = values.map((value) => `proto ${value}`);
                    filterParts.push(`(${protocolFilter.join(' or ')})`);
                    break;
                }
                default:
                    console.warn(`Unsupported filter key: ${key}`);
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
    dumpcap = (0, child_process_1.spawn)('dumpcap', [
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
    dumpcap.on('error', (error) => {
        console.error(`dumpcap error: ${error.message}`);
    });
    dumpcap.on('close', (code) => {
        console.log(`dumpcap process exited with code ${code}`);
    });
    // Start the WebSocket server
    // Start the file watcher and pass the WebSocket server to it
    (0, file_watcher_1.startFileWatcher)(captureDirectory, server_1.wsServer);
    return "Main process started successfully";
};
exports.startMainProcess = startMainProcess;
const stopMainProcess = () => {
    if (dumpcap) {
        dumpcap.kill('SIGINT'); // Send SIGINT to stop dumpcap gracefully
        dumpcap = null; // Clear the reference
        console.log('Main process stopped successfully');
    }
    else {
        console.log('No running process to stop');
    }
};
exports.stopMainProcess = stopMainProcess;
