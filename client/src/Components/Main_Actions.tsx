import React, { useEffect, useState } from 'react';
import { Grid,Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SummarizeIcon from '@mui/icons-material/Summarize';

interface Main_ActionsProps {
    ActionName: string;
}


const Main_Actions: React.FC<Main_ActionsProps> = (props) => {
    return(
        <Grid container item xs={3} style={{
            display: "flex",
            padding: "10px 15px",
            alignItems: "center",
            borderRadius: "10px",
            border: "1px solid rgba(48, 76, 87, 0.10)",
            

        }}>
        

            <Grid item xs={2}>
                {
                    props.ActionName==="Start" ? <PlayArrowIcon style={{
                        color: "#326591",
                        fontSize: "23px",
                        marginTop: "5px",
                    }}/> : props.ActionName==="Report" ? <SummarizeIcon style={{
                        color: "#326591",
                        fontSize: "23px",
                        marginTop: "5px",
                    }}/> : ""
                }
            
            </Grid>
            <Grid item xs={10} style={{
                color: "#326591",
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: "600",
                fontStyle: "normal",
                lineHeight: "normal",
            }}>
                {
                    props.ActionName==="Start" ? "Start Capture" : props.ActionName==="Report" ? "Generate Report" : ""
                }
            </Grid>

            </Grid>
    )
}

export default Main_Actions;
