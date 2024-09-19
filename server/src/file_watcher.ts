// file_watcher.ts

import * as chokidar from 'chokidar';
import * as path from 'path';
import * as fs from 'fs';
import { processCaptureFile } from './packet_processor';
import { WebSocket, WebSocketServer } from 'ws';

export function startFileWatcher(
  captureDirectory: string,
  wsServer: WebSocketServer
): void {
 
  const processedFiles: Set<string> = new Set();

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
    .on('add', (filePath: string) => {
      console.log(`File added: ${filePath}`);
      handleFile(filePath, wsServer, processedFiles);
    })
    .on('change', (filePath: string) => {
      console.log(`File changed: ${filePath}`);
      handleFile(filePath, wsServer, processedFiles);
    })
    .on('error', (error: Error) => {
      console.error(`Watcher error: ${error.message}`);
    });
}

function handleFile(
  filePath: string,
  ws: WebSocketServer,
  processedFiles: Set<string>
): void {
  if (processedFiles.has(filePath)) return;

  // Check if the file is ready (no longer being written to)
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(`Error stating file ${filePath}: ${err.message}`);
      return;
    }

    

    const now = Date.now();
    const mtime = new Date(stats.mtime).getTime();

    // If the file hasn't been modified in the last 5 seconds, process it
    if (now - mtime > 5000) {
      processedFiles.add(filePath);
      processCaptureFile(filePath,ws, () => {
        // After processing, delete the file
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}: ${err.message}`);
          } else {
            console.log(`Deleted file: ${filePath}`);
            processedFiles.delete(filePath);
          }
        });
      });
    }
  });
}
