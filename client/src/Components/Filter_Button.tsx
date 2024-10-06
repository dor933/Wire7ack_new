import React from 'react'
import { Grid } from "@mui/material"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useGlobal } from './Context/Global';
import Box from '@mui/material/Box';

interface Filter_ButtonProps {
    setisfiltervisible: React.Dispatch<React.SetStateAction<boolean>>;
    isfiltervisible: boolean;
    ismainfilter: boolean;
}

const Filter_Button:React.FC<Filter_ButtonProps> = ({setisfiltervisible,isfiltervisible,ismainfilter}) => {

    

    
    
    return (

        ismainfilter ?

        


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
   


</Grid> :      <Grid container item xs={12} style={{
        display:'flex',
        alignItems:'flex-start',
        marginTop:'10px'
      }}>
      {/* Adjust the Grid item size as needed */}
      <Grid item xs={12} >
        {/* Box acting as the button */}
        <Box
          onClick={() => {
            setisfiltervisible(!isfiltervisible);
          }}
          sx={{
            display: 'flex',
            padding: '10px 15px',
            alignItems: 'center',
            borderRadius: '10px',
            background: 'rgba(64, 75, 137, 0.10)',
            cursor: 'pointer',
            width: 'fit-content',
          }}
        >
          <FilterAltIcon
            sx={{
              color: '#326591',
              fontSize: '23px',
              marginRight: '8px', // Add space between icon and text
            }}
          />
          <Box
            sx={{
              color: '#326591',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: '600',
              fontStyle: 'normal',
              lineHeight: 'normal',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isfiltervisible ? 'Hide Filters' : 'Table Filters'}
          </Box>
        </Box>
      </Grid>
    </Grid>


    )
}

export default Filter_Button