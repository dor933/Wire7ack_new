import "../App.css";
import React, { useEffect, useState } from 'react';
import { Grid,Box } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchBar from "./SearchBar";


const Main_Comp: React.FC = () => {
    return (
      
        <Grid container style={{
            width: "95%",
            padding: "30px",
            flexDirection: "column",
            gap: "20px",
            flexShrink: "0",
            alignItems: "flex-end",
        }}>

            <Grid container item xs={12} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                flexDirection: "row",
            }}>

            <Grid container item xs={6} style={{
                flexDirection:"column",
                gap:"10px",
                display:"flex",
                alignItems:"flex-start",
            }}>
                <Grid item xs={12} style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    lineHeight: "normal",
                    color: "#120213",
                    fontFamily: "Roboto",
                    marginBottom: "10px",
                }}>
                    Connections DATA
                    </Grid>
                    <Grid item xs={12} style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "normal",
                    color: "#304C57",
                    fontFamily: "Roboto",
                    opacity: "0.7"
                }}>
                    Each connection is a record of a network connection between this device and another.
                    </Grid>
                    <Grid item xs={12} style={{
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "normal",
                    color: "#304C57",
                    fontFamily: "Roboto",
                    opacity: "0.7"

                }}>
                    Within each connection, you can find the packets that were sent and received.
                    </Grid>
                </Grid>
                <Grid container item xs={6} style={{
                flexDirection:"row",
                gap:"10px",
                display:"flex",
                alignItems:"center",
                justifyContent:"flex-end",
            }}>
                <Grid item xs={4} xl={2} style={{
                    display: "flex",
                    padding: "10px 15px",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "10px",
                    background: "rgba(64, 75, 137, 0.10)",
                }}>
                          <Grid item xs={2} >
                    <FilterAltIcon style={{
                        color: "#326591",
                        fontSize: "23px",
                        marginTop: "5px",
                    }}/>
                </Grid>
                <Grid item xs={10} style={{
                    color: "#326591",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: "600",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  

                }}>
                    Add Filter
                    </Grid>

                </Grid>

                <Grid item xs={4}>
                    <SearchBar SearchType="Search"/>

                </Grid>

          
                

                </Grid>

            </Grid>

        </Grid>
    )
}

export default Main_Comp;