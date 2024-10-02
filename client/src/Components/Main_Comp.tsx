import "../App.css";
import React, { useEffect, useState } from 'react';
import { Grid,Box } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchBar from "./SearchBar";
import Top_Table_Element from "./Top_Table_Element";
//import calender icon
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Connection_Columns from "./Connection_Columns";
import Table from "./Table";
import Top_Table_Date from "./Top_Table_Date";
import { Stream as Stream } from '../shared/Stream';
import {Checkbox} from "@mui/material";
import { Visibility } from "@mui/icons-material";

interface Main_CompProps {
    rows:Stream[],
    setrows:Function
}


const Main_Comp: React.FC<Main_CompProps> = (props) => {

    const newrows=props.rows;
    const [ChosenFields,setChosenFields]=useState<Record <string,string[]>>({});
    const [ProtocolFilter, setProtocolFilter] = useState<string>('');
    const [ValidityFilter, setValidityFilter] = useState<boolean | undefined>(undefined);
    const [FlagsFilter, setFlagsFilter] = useState<string>('');
    const [SourceIPFilter, setSourceIPFilter] = useState<string>('');
    const [DestinationIPFilter, setDestinationIPFilter] = useState<string>('');
    const [isfiltervisible,setisfiltervisible]=useState<boolean>(false);
    const [startdatetime,setstartdatetime]=useState<string>('');
    const [enddatetime,setenddatetime]=useState<string>('');

    const handleclearall=()=>{
        props.setrows([]);
        
    }

    useEffect(()=>{

    },[startdatetime,enddatetime,ProtocolFilter,ValidityFilter,FlagsFilter,SourceIPFilter,DestinationIPFilter])
    



    console.log('new rows are',newrows);
    

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
                <Grid onClick={()=> {setisfiltervisible(!isfiltervisible)}} container item xs={4} xl={2} style={{
                    display: "flex",
                    padding: "10px 10px",
                    alignItems: "center",
                    borderRadius: "10px",
                    background: "rgba(64, 75, 137, 0.10)",
                    cursor: "pointer",
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  

                }}>
                    {
                        isfiltervisible ? "Hide Filters" : "Show Filters"
                    }
                    </Grid>
                   


                </Grid>

                {/* <Grid container item xs={12} style={{ 
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    justifyContent: "flex-end",
                }}>
                    <Grid item xs={2} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        
                    </Grid>

                    </Grid> */}

                <Grid item xs={4}>
                    <SearchBar SearchType="Search" Fields={ChosenFields}/>

                </Grid>

          
                

                </Grid>

            </Grid>
            <Grid container item xs={12} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                flexDirection: "row",
            }}>
                 <Grid container item xs={8} style={{
                flexDirection:"row",
                display:"flex",
                alignItems:"flex-start",
                gap:"10px",

                
                
            }}>
               
            
            <Top_Table_Date ElementName="Start Time" Icon={<KeyboardArrowDownIcon style={{
                    color: "#326591",
                    fontSize: "23px",
                    marginTop: "5px",

                }}/>}
                
                SetNewValue={setstartdatetime}
                />

                    <Top_Table_Date   ElementName="End Time" Icon={<KeyboardArrowDownIcon style={{
                    color: "#326591",
                    fontSize: "23px",
                    marginTop: "5px",
                }}/>}
                
                SetNewValue={setenddatetime}
                />
                <Top_Table_Element Data={
                  //list all the unique values of the Protocol field
                    newrows.map((row)=>row.Protocol).filter((value,index,self)=>self.indexOf(value)===index)
                }  ElementName="Protocol" Icon={<KeyboardArrowDownIcon style={{
                    color: "#326591",
                    fontSize: "23px",
                    marginTop: "5px",
                }}/>}

                SetNewValue={setProtocolFilter}
                
                />

<Top_Table_Element Data={
  
  //list all the unique values of the Flags field inside the Packet array in the Stream object

    newrows.map((row)=>row.Packets.map((packet)=>packet.flags)).flat().filter((value,index,self)=>self.indexOf(value)===index)

}  ElementName="Flags" Icon={<KeyboardArrowDownIcon style={{
                    color: "#326591",
                    fontSize: "23px",
                    marginTop: "5px",
                }}/>}
                SetNewValue={setFlagsFilter}
                />
            
                


            </Grid>
            <Grid container item xs={4} style={{
                flexDirection:"row",
                display:"flex",
                justifyContent:"space-between",
             
            }}>
                      <Box
  style={{
    color: "#304C57",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "normal",
    marginTop:"-35px",
    display: "flex",
    flexDirection: "column", // This makes the content flow into two rows
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: "auto",
    opacity: isfiltervisible ? "1" : "0",
  }}
>
  <div    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "8px", // Adds space between rows
    }}>
    <span style={{ color:"#304C57",fontWeight: "400",minWidth:"120px",flexGrow:1 }}>Source IP</span>
    <Checkbox
      defaultChecked={false}
      color="primary"
      id="source.ip"
        onChange={(e)=>{
    
            if(e.target.checked){
            setChosenFields({...ChosenFields,"Source IP":[]});
            }
            else{
              setChosenFields((prevFields) => {
                const { "Source IP": _, ...rest } = prevFields;
                return rest;

              });           
             }
        }
    }

      inputProps={{ "aria-label": "secondary checkbox" }}
    />
    <span style={{ fontWeight: "400",minWidth:"120px",flexGrow:1,color: "#304C57", }}>Destination IP</span>
    <Checkbox
      defaultChecked={false}
      color="primary"
      id="dest.ip"
      onChange={(e)=>{
        if(e.target.checked){
          setChosenFields({
            ...ChosenFields,
            "Destination IP": [] // Add "Destination IP" with an initial empty value
          });
        }
        else{
          setChosenFields((prevFields:Record<string,string[]>) => {
  const { "Destination IP": _, ...rest } = prevFields;
  return rest;
}); 
        }
      }
    }
      inputProps={{ "aria-label": "secondary checkbox" }}
    />
 
        
     
  </div>

  <div    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "8px", // Adds space between rows
    }}>
  <span style={{color: "#304C57", fontWeight: "400",minWidth:"120px",flexGrow:1 }}>Validity</span>

  <Checkbox
      defaultChecked={false}
      color="primary"
      id="validity"
      onChange={(e)=>{
        if(e.target.checked){
          setChosenFields({
            ...ChosenFields,
            "Validity": [] // Add "Destination IP" with an initial empty value
          });
        } 
        else{
          setChosenFields((prevFields:Record<string,string[]>) => {
  const { "Validity": _, ...rest } = prevFields;
  return rest;
          });
        }
      
      }
      

      }
    
      inputProps={{ "aria-label": "secondary checkbox" }}
    />
    <span style={{ color: "#304C57",fontWeight: "400",minWidth:"120px",flexGrow:1 }}>Protocol</span>
        <Checkbox
      defaultChecked={false}
      id="protocol"
        onChange={(e)=>{
            if(e.target.checked){
            setChosenFields({...ChosenFields,"Protocol":[]});
            }
            else{
              setChosenFields((prevFields) => {
                const { "Protocol": _, ...rest } = prevFields;
                return rest;

              });           
             }
            }
    
        }
    
      color="primary"
      inputProps={{ "aria-label": "secondary checkbox" }}
    />
  </div>
</Box>
          
       
               

                </Grid>

           <Grid container style={{
            display:'flex',
            justifyContent:'flex-end'
           }}>

                <Box style={{
            color: "#304C57",
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "normal",
            height: "fit-content",
            opacity: "0.6",
            display:"flex",
            alignItems:"flex-start",
            justifyContent:"flex-start",
            padding: "10px 15px",
            borderRadius: "10px",
            border: "1px solid rgba(48, 76, 87, 0.20)",
            background: "#FFF",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.10)",
           }}>

            <div onClick={()=> handleclearall()} style={{
                display:"flex",
                alignItems:"center",
                gap:"10px",
                cursor:"pointer",
            }}>
                                Clear All

                <HighlightOffIcon style={{
                    color: "#000000",
                    fontSize: "23px",
                }}/>
                </div>

     
           </Box>
           </Grid>


                </Grid>
                <Table rows={newrows} ProtocolFilter={ProtocolFilter} 
                ValidityFilter={ValidityFilter} 
                FlagsFilter={FlagsFilter} 
                SourceIPFilter={SourceIPFilter} 
                DestinationIPFilter={DestinationIPFilter}
                starttimedate={startdatetime}
                endtimedate={enddatetime}
                

                />
                {/* <Connection_Columns/> */}

        </Grid>
    )
}

export default Main_Comp;