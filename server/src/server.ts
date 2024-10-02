import express, { Application, Request, Response, NextFunction } from 'express';
import { startMainProcess } from './main';
import { stopFileWatcher } from './file_watcher';
import path from 'path';
import Startroute from './routes/start';
import Stoproute from './routes/stop';
import preconfig from './routes/preconfig';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { startWebSocketServer } from './websocket_server';

const wsServer: WebSocketServer = startWebSocketServer();

//import cors

const capturedirectory= path.join(__dirname, './captures');

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api',Startroute);
app.use('/api',Stoproute);
app.use('/api',preconfig);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export { wsServer };