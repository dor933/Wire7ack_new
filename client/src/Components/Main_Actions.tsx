import React, { useEffect, useState } from 'react';
import { Grid,Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SummarizeIcon from '@mui/icons-material/Summarize';
import {useMediaQuery} from '@mui/material';
import axios from 'axios';
import { useGlobal } from './Context/Global';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Padding } from '@mui/icons-material';

interface Main_ActionsProps {
    ActionName: string;
}


const Main_Actions: React.FC<Main_ActionsProps> = (props) => {

    const {chosenInterface,setChosenInterface} = useGlobal();
    const {ChosenFields,setChosenFields} = useGlobal();
    const {iscapturing,setIscapturing} = useGlobal();
    const {setLast_stream_id}= useGlobal();

    useEffect(() => {

        console.log('those are chosen fields',ChosenFields);
    }
    ,[ChosenFields]);


    const handlestart = async () => {


        if(chosenInterface.length===0){
            alert('Please choose an interface');
            return;
        }

        let isvalidserach=false;

        Object.keys(ChosenFields).forEach((key)=>{
            if(RegExp('ip host [1-5]').test(key) && ChosenFields[key].length>0){
                isvalidserach=true;
            }
        });

        if(!isvalidserach){
            alert('Please add at least one ip host 1-5 field with value');
            return;
        }

        let id:any=await axios.get('https://localhost:32531/Stream/GetLastStreamID');
        setLast_stream_id(id.data)

     

        axios.post('http://localhost:8000/api/start', {
            interfaceName: chosenInterface,
            fields: ChosenFields,
        })
        .then((response) => {
            console.log(response);
            if(response.status===200){
            setIscapturing(true);
            }
            else{
                alert('Failed to start capture');
            }   
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handlestop = () => {
         axios.get('http://localhost:8000/api/stop')
        .then((response) => {
            if(response.status===200){
                setIscapturing(false);
               
            }
            else{
                alert('Failed to stop capture');
            }
            console.log(response);
        })
        .catch((error) => {
            console.log(error); 
        },)
       
        

        
    }





    const isxl= useMediaQuery('(min-width:1920px)');

    return(
        <Grid onClick={props.ActionName==='Start' && !iscapturing? ()=> handlestart() : props.ActionName==='Start'&& iscapturing? ()=> handlestop(): ()=> handlestart()} container item xs={4} xl={3} style={{
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
                    props.ActionName==="Start" && !iscapturing ? <PlayArrowIcon style={{
                        color: "#326591",
                        fontSize: "23px",
                    }}/> : props.ActionName==="Start" && iscapturing? <StopCircleIcon
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
                paddingLeft:'5px'
            }}>
                {
                        props.ActionName==="Start" && !iscapturing ? "Start Capture" : props.ActionName==="Start" && iscapturing ? "Stop Capture": props.ActionName==="Report" ? <> <span>
                            Report
                        </span> 
                        <Box style={{
                             display: "flex",
                          
                            
                             alignItems: "center",
                             border: "1px solid rgba(48, 76, 87, 0.20)", 
                             borderRadius: "10px",
                             marginLeft:'25px',
                             paddingLeft:'10px',
                             paddingRight:'10px'
                             
                         }}>
                        <span style={
                            {
                            
                                fontFamily: "Roboto",
                                fontSize:'14px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                color: "#326591",
                                fontWeight:400
                            }
                        }>
                            Soon!
                        </span> 
                        </Box>
                        </>
                        : ""
                }


            </Grid>

            </Grid>
    )
}

export default Main_Actions;
