// websocket_server.ts

import { WebSocketServer, WebSocket } from 'ws';



export function startWebSocketServer(): WebSocketServer {
  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');

    ws.on('message', (message: string) => {
      console.log(`Received message from client: ${message}`);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (error: Error) => {
      console.error(`WebSocket error: ${error.message}`);
    });
  });

  return wss;
}
