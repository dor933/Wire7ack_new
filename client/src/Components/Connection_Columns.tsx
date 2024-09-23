import React, { useEffect, useState } from 'react';
import { Grid,Box } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Column from "./Column";

const Connection_Columns: React.FC = () => {


const columns:string[] = ["ID", "Source IP", "Destination IP", "Source Port", "Destination Port", "Protocol", "Status", "Timestamp", "Action","DataVolume","Application Protocol"];

    return (

        <Grid container item xs={12} style={{
            display: "flex",
            padding: "15px 20px",
            alignItems: "center",
            gap: "10px",
            alignSelf: "stretch",
            borderRadius: "10px 10px 0px 0px",
            background: "#F7FBFC",
        }}>

      {columns.map((column, index) => {

            return <Column key={index} ColumnName={column} />
            
      }


        )}
    
            </Grid>


    );


}

export default Connection_Columns;