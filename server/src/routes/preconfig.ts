import express, { Application, Request, Response, NextFunction,Router } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import { getTsharkInterfaces } from '../Functions';
import { getipv4address } from '../Functions';
import logger from '../logger';

const router=Router();

router.get('/preconfig/interfaces', async (req: Request, res: Response) => {
    try {
      const result:string[] = await getTsharkInterfaces();
      const ipv4Address =getipv4address();
      res.send({interfaces:result,ipv4Address});
      logger.info('Interfaces and IPv4 address fetched:',{Component:'Preconfig'},{interfaces:result,ipv4Address});
    }
    catch (error) {
        logger.error('Error getting interfaces:',{Component:'Preconfig'},{error:error});
        res.status(500).send('Failed to get interfaces');
        }
    }
    );



    export default router;
    