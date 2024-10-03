"use strict";
// file_watcher.ts
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
exports.startFileWatcher = startFileWatcher;
exports.stopFileWatcher = stopFileWatcher;
const chokidar = __importStar(require("chokidar"));
const fs = __importStar(require("fs"));
const packet_processor_1 = require("./packet_processor");
const Streams = [];
let watcher = null;
function startFileWatcher(captureDirectory, wsServer) {
    const processedFiles = new Set();
    // Watch the capture directory for new or changed files
    const watcher = chokidar.watch(`${captureDirectory}`, {
        persistent: true,
        usePolling: true,
        interval: 1000, // Check for changes every second
        awaitWriteFinish: {
            stabilityThreshold: 5000, // Wait for 5 seconds of inactivity
            pollInterval: 1000,
        },
    });
    console.log(`watching on ${captureDirectory}/*.pcapng`);
    watcher.on('all', (event, path) => {
        console.log(event, path);
    });
    watcher
        .on('add', (filePath) => {
        console.log(`File added: ${filePath}`);
        handleFile(filePath, wsServer, processedFiles);
    })
        .on('change', (filePath) => {
        console.log(`File changed: ${filePath}`);
        handleFile(filePath, wsServer, processedFiles);
    })
        .on('error', (error) => {
        console.error(`Watcher error: ${error.message}`);
    });
}
function stopFileWatcher(onComplete, CaptureDirectory) {
    if (!watcher) {
        console.error('Watcher is not running or is already stopped.');
        return;
    }
    watcher.close().then(() => {
        console.log('File watcher stopped. Processing remaining files...');
        checkIfProcessingIsComplete(CaptureDirectory, onComplete); // Process any remaining files
    }).catch((error) => {
        console.error('Error closing the watcher:', error);
    }).finally(() => {
        watcher = null; // Reset watcher to null after it's closed
    });
}
function handleFile(filePath, ws, processedFiles) {
    if (processedFiles.has(filePath))
        return;
    // Check if the file is ready (no longer being written to)
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(`Error stating file ${filePath}: ${err.message}`);
            return;
        }
        //check if the file size is greater or equial to 3 MB
        if (stats.size < 3000000) {
            console.log('File size is less than 3 MB, skipping processing.');
            return;
        }
        else {
            console.log('File size is greater than 3 MB, processing.');
            processedFiles.add(filePath);
            (0, packet_processor_1.processCaptureFile)(filePath, ws, Streams, () => {
                // After processing, delete the file
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${filePath}: ${err.message}`);
                    }
                    else {
                        console.log(`Deleted file: ${filePath}`);
                    }
                });
            });
        }
    });
}
function checkIfProcessingIsComplete(captureDirectory, onComplete) {
    const intervalId = setInterval(() => {
        fs.readdir(captureDirectory, (err, files) => {
            if (err) {
                console.error(`Error reading directory ${captureDirectory}: ${err.message}`);
                clearInterval(intervalId);
                return;
            }
            if (files.length === 0) {
                console.log('Capture directory is empty. All files processed.');
                clearInterval(intervalId);
                onComplete();
            }
            else {
                console.log(`Files remaining in directory: ${files.length}`);
            }
        });
    }, 1000); // Check every 1 second if the folder is empty
}
