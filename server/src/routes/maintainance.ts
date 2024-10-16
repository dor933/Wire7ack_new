import express, { Application, Request, Response, NextFunction,Router } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import { getTsharkInterfaces } from '../Functions';
import { getipv4address } from '../Functions';
import {iscapturing} from '../main'


const router=Router();


router.get('/maintainance/iscapture', async (req: Request, res: Response) => {
    try {

      
     
      if(iscapturing){
        res.send({iscapturing:true});
        
      }
      else{
        res.send({iscapturing:false});
      }
    }
    catch (error) {

      res.status(500).send('Failed to get capture status');
     

        }
    }
    );

    export default router;