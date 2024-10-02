import express, { Application, Request, Response, NextFunction,Router } from 'express';
import { startMainProcess } from '../main';


const router=Router();

router.post('/start',(req: Request, res: Response) => {
    try {

      const { interfaceName } = req.body;
      const result = startMainProcess(interfaceName);
      res.send(result);
    } catch (error) {
      console.error('Error starting the main process:', error);
      res.status(500).send('Failed to start the main process');
    }
  });

  export default router;

