import "../App.css";
import React, { useEffect, useState } from 'react';
import { Grid,Box } from "@mui/material";



const Header: React.FC = () => {
    return (
       <Grid container style={{display: "flex",
        width:"100%",
        padding: "10px 30px",
        justifyContent: "space-between",
        alignItems: "center",
        
              }}>

                <Grid container item xs={4} style={{display: "flex",alignItems: "center"}}>

                    <Grid item xs={3}>

                        <Box style={{fontSize:"20px",fontWeight:"bold"}}>Logo</Box>
                       

                    </Grid>
                    <Grid container item xs={3} style={{display: "flex",
                    justifyContent: "space-between",
                    }}>
                        <Grid item xs={2}>
                            Icon
                        </Grid>
                        <Grid item xs={10} style={{
                            display: "flex",
                            justifyContent:'flex-start',
                            alignItems: "center",
                            paddingLeft:"20px",
                            
                        }}>
                        Home
                        </Grid>
                    </Grid>
                    <Grid container item xs={3} style={{display: "flex",
                    justifyContent: "space-between",
                    }}>
                        <Grid item xs={2}>
                            Icon
                        </Grid>
                        <Grid item xs={10} style={{
                            display: "flex",
                            justifyContent:'flex-start',
                            alignItems: "center",
                            paddingLeft:"20px",
                            
                        }}>
                        Layers
                        </Grid>
                    </Grid>

                    <Grid container item xs={3} style={{display: "flex",
                    justifyContent: "space-between",
                    }}>
                        <Grid item xs={2}>
                            Icon
                        </Grid>
                        <Grid item xs={10} style={{
                            display: "flex",
                            justifyContent:'flex-start',
                            alignItems: "center",
                            paddingLeft:"20px",
                            
                        }}>
                        Inventory
                        </Grid>
                    </Grid>

                    </Grid>

              </Grid>
    );
};


export default Header;