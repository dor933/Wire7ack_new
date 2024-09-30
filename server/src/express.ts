import express, { Application, Request, Response, NextFunction } from 'express';
import { startMainProcess } from './main';
import { stopFileWatcher } from './file_watcher';
import path from 'path';

const capturedirectory= path.join(__dirname, './captures');

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/start', (req: Request, res: Response) => {
    try {
      const result = startMainProcess();
      res.send(result);
    } catch (error) {
      console.error('Error starting the main process:', error);
      res.status(500).send('Failed to start the main process');
    }
  });

  app.get('/stop', (req: Request, res: Response) => {
    try {

      const result = stopFileWatcher(()=>{

        console.log('File watcher stopped. Processing remaining files...');

      },capturedirectory);

        res.send(result);

    } catch (error) {
      console.error('Error stopping the main process:', error);
      res.status(500).send('Failed to stop the main process');
    }
  });

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