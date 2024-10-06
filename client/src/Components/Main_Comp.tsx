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
import Filter_Button from "./Filter_Button";
import { FormControlLabel } from "@mui/material";
import { useGlobal,GlobalProvider } from "./Context/Global";

interface Main_CompProps {
    rows:Stream[],
    setrows:Function,
    invalid_streams:Stream[],
    setInvalid_streams:Function,
}


const Main_Comp: React.FC<Main_CompProps> = (props) => {

    const newrows=props.rows;
    const {ChosenFields,setChosenFields}=useGlobal();
    const [ProtocolFilter, setProtocolFilter] = useState<string>('');
    const [ValidityFilter, setValidityFilter] = useState<boolean | undefined>(undefined);
    const [FlagsFilter, setFlagsFilter] = useState<string>('');
    const [SourceIPFilter, setSourceIPFilter] = useState<string>('');
    const [DestinationIPFilter, setDestinationIPFilter] = useState<string>('');
    const [isfiltervisible,setisfiltervisible]=useState<boolean>(false);
    const [startdatetime,setstartdatetime]=useState<string>('');
    const [enddatetime,setenddatetime]=useState<string>('');
    const [tablefilters,settablefilters]=useState<string[]>(["Start Time", "End Time", "Protocol", "Flags", "Source IP", "Destination IP", "Validity"]);
    const [chosentablefilters,setchosentablefilters]=useState<string[]>([]);
    const [isfilter2visible,setisfilter2visible]=useState<boolean>(false);
    const maxtablefilters=4;
      
    
    useEffect(() => {
      setchosentablefilters(tablefilters.slice(0, maxtablefilters));
    }, [tablefilters]);
  
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, filter: string) => {
      if (event.target.checked) {
        if (chosentablefilters.length >= maxtablefilters) {
          // Maximum filters selected, do not add more
          return;
        }
        setchosentablefilters([...chosentablefilters, filter]);
      } else {
        setchosentablefilters(chosentablefilters.filter((f) => f !== filter));
      }
    };
  
    const handleclearall = () => {
      props.setrows([]);
      props.setInvalid_streams([]);
    };
  
    useEffect(() => {
      // Update the table data based on filter changes if needed
    }, [startdatetime, enddatetime, ProtocolFilter, ValidityFilter, FlagsFilter, SourceIPFilter, DestinationIPFilter]);
  
    



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

                 
                    <Filter_Button setisfiltervisible={setisfilter2visible} isfiltervisible={isfilter2visible} ismainfilter={false}/>

                    {isfilter2visible && (
                      
            <Grid container item xs={12} spacing={1}>
              {tablefilters.map((filter) => (
                <Grid item key={filter}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={chosentablefilters.includes(filter)}
                        onChange={(event) => handleCheckboxChange(event, filter)}
                        name={filter}
                        color="primary"
                        disabled={
                          !chosentablefilters.includes(filter) && chosentablefilters.length >= maxtablefilters
                        }
                      />
                    }
                    label={filter}
                    style={{ 
                      fontFamily: "Roboto",
                      fontSize: "10px",
                      color: "#000000",
                      fontWeight: "200",

                     }}
                  />
                </Grid>
              ))}
              </Grid>
            )}

                    
                </Grid>
                <Grid container item xs={6} style={{
                flexDirection:"row",
                gap:"10px",
                display:"flex",
                alignItems:"center",
                justifyContent:"flex-end",
            }}>
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
    fontWeight: "500",
    lineHeight: "normal",
    
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
    <span style={{ fontWeight: ChosenFields.hasOwnProperty("ip host 1")? 500:400 ,minWidth:"100px",flexGrow:1, color: ChosenFields.hasOwnProperty("ip host 1") ? "#0d0da3" : "#304C57", 

    }}>ip host 1</span>
 
 <span style={{ fontWeight: ChosenFields.hasOwnProperty("ip host 2")? 500:400 ,minWidth:"100px",flexGrow:1, color: ChosenFields.hasOwnProperty("ip host 2") ? "#0d0da3" : "#304C57", 
  
      }}> 
    ip host 2</span>
   
 
        
     
  </div>

  <div    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "8px", // Adds space between rows
  
  }}>
     
 <span style={{ fontWeight: ChosenFields.hasOwnProperty("Validity")? 500:400 ,minWidth:"100px",flexGrow:1, color: ChosenFields.hasOwnProperty("Validity") ? "#0d0da3" : "#304C57", 
  
}}> 
  Validity</span>

 
  <span style={{ fontWeight: ChosenFields.hasOwnProperty("Protocol")? 500:400 ,minWidth:"100px",flexGrow:1, color: ChosenFields.hasOwnProperty("Protocol") ? "#0d0da3" : "#304C57", 
  
}}> 
   Protocol</span>
      
  </div>
  
</Box>
          
       
               

                </Grid>
            
            <Filter_Button setisfiltervisible={setisfiltervisible} isfiltervisible={isfiltervisible} ismainfilter={true}/>

            

                <Grid item xs={4}>
                    <SearchBar SearchType="Search" Fields={ChosenFields} setChosenFields={setChosenFields}/>

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
             
             {
  chosentablefilters.map((filter) => {
    if (filter === "Start Time") {
      return (
        <Top_Table_Date
          key={filter}
          ElementName="Start Time"
          Icon={
            <KeyboardArrowDownIcon
              style={{
                color: "#000000",
                fontSize: "23px",
                marginTop: "5px",
              }}
            />
          }
          SetNewValue={setstartdatetime}
        />
      );
    } else if (filter === "End Time") {
      return (
        <Top_Table_Date
          key={filter}
          ElementName="End Time"
          Icon={
            <KeyboardArrowDownIcon
              style={{
                color: "#000000",
                fontSize: "23px",
                marginTop: "5px",
              }}
            />
          }
          SetNewValue={setenddatetime}
        />
      );
    } else if (filter === "Source IP") {
      return (
        <Top_Table_Element
          key={filter}
          Data={[]}
          useTextInput={true}
          ElementName="Source IP"
          Icon={
            <KeyboardArrowDownIcon
              style={{
                color: "#000000",
                fontSize: "23px",
                marginTop: "5px",
              }}
            />
          }
          SetNewValue={setSourceIPFilter}
        />
      );
    } else if (filter === "Destination IP") {
      return (
        <Top_Table_Element
          key={filter}
          Data={[]}
          useTextInput={true}
          ElementName="Destination IP"
          Icon={
            <KeyboardArrowDownIcon
              style={{
                color: "#000000",
                fontSize: "23px",
                marginTop: "5px",
              }}
            />
          }
          SetNewValue={setDestinationIPFilter}
        />
      );
    } else if (filter === "Protocol") {
      return (
        <Top_Table_Element
          key={filter}
          Data={
            // List all the unique values of the Protocol field
            newrows.concat(props.invalid_streams)
              .map((row) => row.Protocol)
              .filter((value, index, self) => self.indexOf(value) === index)
          }
          ElementName="Protocol"
          Icon={
            <KeyboardArrowDownIcon
              style={{
                color: "#000000",
                fontSize: "23px",
                marginTop: "5px",
              }}
            />
          }
          SetNewValue={setProtocolFilter}
        />
      );
    } else if (filter === "Flags") {
      return (
        <Top_Table_Element
          key={filter}
          Data={
            newrows
              .map((row) => row.Packets.map((packet) => packet.flags))
              .flat()
              .filter((value, index, self) => self.indexOf(value) === index)
          }
          ElementName="Flags"
          Icon={
            <KeyboardArrowDownIcon
              style={{
                color: "#000000",
                fontSize: "23px",
                marginTop: "5px",
              }}
            />
          }
          SetNewValue={setFlagsFilter}
        />
      );
    } else {
      return null;
    }
  })
}

              
              
                


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
                invalid_streams={props.invalid_streams}
                

                />
                {/* <Connection_Columns/> */}

        </Grid>
    )
}

export default Main_Comp;