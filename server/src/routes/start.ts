import express, { Application, Request, Response, NextFunction,Router } from 'express';
import { startMainProcess } from '../main';


const router=Router();

router.post('/start',(req: Request, res: Response) => {
    try {

      const { interfaceName,fields } = req.body;
      
      console.log('this is fields',fields);
      const result = startMainProcess(interfaceName,fields);
      res.send(result);
    } catch (error) {
      console.error('Error starting the main process:', error);
      res.status(500).send('Failed to start the main process');
    }
  });

  export default router;

