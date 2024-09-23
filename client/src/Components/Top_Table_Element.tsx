import React, { useEffect, useState } from 'react';
import Main_Comp from './Main_Comp';
import { Grid, Box } from "@mui/material";
import { useGlobal } from './Context/Global';

interface Top_Table_ElementProps {
    ElementName: string;
    Icon: any;
}

const Top_Table_Element: React.FC<Top_Table_ElementProps> = (props) => {

    return (
        <Grid container item xs={2} style={{
            display: "flex",
            padding: "10px 15px",
            alignItems: "center",
            borderRadius: "10px",
            border: "1px solid rgba(48, 76, 87, 0.20)",
            background: "#FFF",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.10)",
            paddingLeft: "10px",
            
       
            
        }}>
            <Grid item xs={8} style={{
                color: "#304C57",
                fontFamily: "Roboto",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                opacity: "0.6",
                
            }}>
                {props.ElementName}

            </Grid>
            <Grid item xs={4} style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
            }}>
                {props.Icon}
            </Grid>

            </Grid>
      
    );
}

export default Top_Table_Element;