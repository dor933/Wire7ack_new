import React, { useEffect, useState } from 'react';
import { Grid,Box } from "@mui/material";
import ImportExportIcon from '@mui/icons-material/ImportExport';

interface ColumnProps {
    ColumnName: string;
}

const Column: React.FC<ColumnProps> = (props) => {

    return(
        <Grid container item xs={1} style={{
            color: "#304C57",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: "normal",
            opacity: "0.7",
        }}>
            <Grid item xs={8}>
                {props.ColumnName}
            </Grid>
            <Grid item xs={4}>
                <ImportExportIcon style={{
                    color: "#304C57",
                    fontSize: "16px",
                }} />

        </Grid>

</Grid>


    )



}

export default Column;