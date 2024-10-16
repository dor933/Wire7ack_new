import { stopFileWatcher } from '../file_watcher';
import express, { Application, Request, Response, NextFunction,Router } from 'express';
import path from 'path';

const capturedirectory= path.join(__dirname, '.././captures');


const router=Router();

router.get('/stop', (req: Request, res: Response) => {
    try {

      const result = stopFileWatcher(()=>{

        console.log('File watcher stopped. Processing remaining files...');

      },capturedirectory);

        res.status(200).send('Capture stopped');

    } catch (error) {
      console.error('Error stopping the main process:', error);
      res.status(500).send('Failed to stop the main process');
    }
  });

  export default router;