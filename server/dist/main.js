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
exports.stopMainProcess = exports.startMainProcess = exports.iscapturing = exports.currentactivation = void 0;
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const file_watcher_1 = require("./file_watcher");
const Functions_1 = require("./Functions");
const server_1 = require("./server");
const Functions_2 = require("./Functions");
const dbConnection_1 = require("./dbConnection");
const Activation_1 = require("./shared/Activation");
const dbops_1 = require("./dbops");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
let dumpcap = null;
exports.currentactivation = null; // Define dumpcap globally
let isShuttingDown = false;
exports.iscapturing = false;
let heartbeatInterval = null;
const HEARTBEAT_INTERVAL = 300000;
const isProcessRunning = async (pid) => {
    try {
        if (process.platform === 'win32') {
            // For Windows
            const { stdout } = await execAsync(`tasklist /FI "PID eq ${pid}" /FO CSV /NH`);
            return stdout.includes(`${pid}`);
        }
        else {
            // For Unix-based systems (Linux, macOS)
            await execAsync(`ps -p ${pid}`);
            return true;
        }
    }
    catch (error) {
        return false; // Process not found
    }
};
const startDumpcap = (interfaceIndex, captureDirectory, baseFileName, numberOfFiles, fileSize, filterString) => {
    dumpcap = (0, child_process_1.spawn)('dumpcap', [
        '-i', interfaceIndex,
        '-b', `files:${numberOfFiles}`,
        '-b', `filesize:${fileSize}`,
        '-f', filterString,
        '-w', path.join(captureDirectory, `${baseFileName}.pcapng`),
    ]);
    exports.iscapturing = true;
    dumpcap.stdout.on('data', (data) => {
        console.log(`dumpcap stdout: ${data}`);
    });
    dumpcap.on('error', (error) => {
        console.error(`dumpcap error: ${error.message}`);
    });
    dumpcap.on('close', async (code) => {
        console.log(`dumpcap process exited with code ${code}`);
        exports.iscapturing = false;
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
                exports.iscapturing = false;
                restartDumpcap();
            }
            else {
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
const startMainProcess = async (interfacename, fields) => {
    const dbConnection = await (0, dbConnection_1.getDbConnection)();
    console.log('this is db connection', dbConnection);
    //find the ip host 1 key in the fields object
    const [iphost1, iphost2, iphost3, iphost4] = Object.values(fields).filter(value => value.length > 0);
    const activation = new Activation_1.Activation(0, 0, new Date(Date.now()), new Date(Date.now()), "", "", iphost1 || "", iphost2 || "", iphost3 || "", iphost4 || "", "");
    exports.currentactivation = await (0, dbops_1.writeActivationToDb)(dbConnection, activation);
    console.log('this is current activation', exports.currentactivation);
    const tsharkInterfaces = await (0, Functions_1.getTsharkInterfaces)();
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
    (0, Functions_2.clearcapturedirectory)(captureDirectory);
    let filterParts = [];
    let ipFilterParts = [];
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
    (0, file_watcher_1.startFileWatcher)(captureDirectory, server_1.wsServer, dbConnection);
    return "Main process started successfully";
    // Start dumpcap with the specified configuration
};
exports.startMainProcess = startMainProcess;
const stopMainProcess = () => {
    isShuttingDown = true;
    stopHeartbeat();
    if (dumpcap) {
        dumpcap.kill('SIGINT');
        dumpcap = null;
        console.log('Main process stopped successfully');
    }
    else {
        console.log('No running process to stop');
    }
};
exports.stopMainProcess = stopMainProcess;
