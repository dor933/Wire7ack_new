import express, { Application, Request, Response, NextFunction,Router } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import { getTsharkInterfaces } from '../Functions';


const router=Router();

router.get('/preconfig/interfaces', async (req: Request, res: Response) => {
    try {
      const result:string[] = await getTsharkInterfaces();
      res.send(result);
    }
    catch (error) {
        console.error('Error getting interfaces:', error);
        res.status(500).send('Failed to get interfaces');
        }
    }
    );



    export default router;
    