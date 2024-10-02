import React, { useEffect, useState } from 'react';
import { Grid,Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SummarizeIcon from '@mui/icons-material/Summarize';
import {useMediaQuery} from '@mui/material';
import axios from 'axios';
import { useGlobal } from './Context/Global';
import StopCircleIcon from '@mui/icons-material/StopCircle';

interface Main_ActionsProps {
    ActionName: string;
}


const Main_Actions: React.FC<Main_ActionsProps> = (props) => {

    const {chosenInterface,setChosenInterface} = useGlobal();
    const {isCaptureStarted,setIsCaptureStarted} = useGlobal();


    const handlestart = () => {
        axios.post('http://localhost:8000/api/start', {
            interfaceName: chosenInterface,
        })
        .then((response) => {
            console.log(response);
            setIsCaptureStarted(true);
        })
        .catch((error) => {
            console.log(error);
        });
    }





    const isxl= useMediaQuery('(min-width:1920px)');

    return(
        <Grid onClick={props.ActionName==='Start'? ()=> handlestart() : ()=> handlestart()} container item xs={4} xl={3} style={{
            display: "flex",
            padding: "10px 15px",
            alignItems: "center",
            borderRadius: "10px",
            border: "1px solid rgba(48, 76, 87, 0.10)",
            cursor: "pointer",
            

        }}>
        

            <Grid item xs={2} style={{
                display: "flex",
                justifyContent: "flex-start",
            }}>
                {
                    props.ActionName==="Start" && !isCaptureStarted ? <PlayArrowIcon style={{
                        color: "#326591",
                        fontSize: "23px",
                    }}/> : props.ActionName==="Start" && isCaptureStarted? <StopCircleIcon
                    style={{
                        color: "#326591",
                        fontSize: "23px",
                    }}/> :
                    
                    props.ActionName==="Report" ? <SummarizeIcon style={{
                        color: "#326591",
                        fontSize: "23px",
                    }}/> : ""
                }
            
            </Grid>
            <Grid item xs={10} style={{
                color: "#326591",
                fontFamily: "Roboto",
                fontSize: isxl? "16px": "12px",
                fontWeight: "600",
                fontStyle: "normal",
                lineHeight: "normal",
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft:'10px'
            }}>
                {
                    props.ActionName==="Start" && !isCaptureStarted ? "Start Capture" : props.ActionName==="Start" && isCaptureStarted ? "Stop Capture": props.ActionName==="Report" ? "Generate Report" : ""
                }
            </Grid>

            </Grid>
    )
}

export default Main_Actions;
