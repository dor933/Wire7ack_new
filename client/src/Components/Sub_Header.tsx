import "../App.css";
import React, { useEffect, useState } from 'react';
import { Grid,Box } from "@mui/material";
import Packet_Views from "./Packets_Views";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Main_Actions from "./Main_Actions";
import InfoIcon from '@mui/icons-material/Info';


const Sub_Header: React.FC = () => {
    return (
        <Grid container style={{
            display: "flex",
            width: "95%",
            padding: "10px 30px",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(48, 76, 87, 0.10)",
            background: "#F7FBFC",
            margin: "0 auto",
            
            
        }}>

            <Grid container item xs={6} style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                
            }}>
                
                <Packet_Views ViewName="All Connections"/>
                <Packet_Views ViewName="Error Connections"/>
                <Packet_Views ViewName="Warning Connections"/>

            </Grid>

            <Grid container item xs={6} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "flex-end",
            }}>
                <Main_Actions ActionName="Start"/>
                <Main_Actions ActionName="Report"/>
                <Grid item xs={1} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}>
                    <InfoIcon style={{
                        color: "#326591",
                        fontSize: "23px",
                        marginTop: "5px",
                    }}/>

                </Grid>
            </Grid>
                
            
        </Grid>
   
    );
}

export default Sub_Header;