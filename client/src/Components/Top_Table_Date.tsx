import React, { useState } from 'react';
import { Grid, TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import '../PaginatedTable.css'; // Custom SCSS for table
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface Top_Table_ElementProps {
  ElementName: string;
  Icon: JSX.Element;
  SetNewValue?: (value: string) => void;
}

const Top_Table_Date: React.FC<Top_Table_ElementProps> = ({ ElementName, Icon, SetNewValue }) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(null);
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);

  const handleDateTimeChange = (newValue: Dayjs | null) => {

    if(newValue === null){
        clearSelectedValue();
        return
        }


    setSelectedDateTime(newValue);
    if (SetNewValue && newValue) {
      SetNewValue(newValue.toISOString());
    }
  };

  const clearSelectedValue = () => {
    setSelectedDateTime(null);
  };

  return (
    <Grid container item xs={2} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '10px',
      
      
        
    }}>
     
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker sx={{    border: '1px solid rgba(48, 76, 87, 0.20)',
      background: '#FFF',
      boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.10)',
      color: '#304C57',
      fontFamily: 'Roboto',
      borderRadius: '10px', 
      width: '100%',
      fontSize: '16px',
       
      fontStyle: 'normal',
      fontWeight: 400,
            opacity: 0.6,}}
            slots={{
               clearIcon: ClearIcon,
               
            }}
            label={ElementName}
            open={pickerOpen}
            onOpen={() => setPickerOpen(true)}
            onClose={() => setPickerOpen(false)}
            value={selectedDateTime}
            format='DD-MM-YYYY HH:mm:ss'
            onChange={(newvalue)=> {

                console.log(newvalue)

                if(!(newvalue instanceof Date)){
                    return
                }
                
                handleDateTimeChange(newvalue)}}

                //dont let the user select with the keyboard
           

            //let it be empty
            



        
            

            //show clear icon when there is a value
            

            //remove the border


      
          />
        </LocalizationProvider>

  

      {/* The date-time picker area */}
     
    </Grid>
  );
};

export default Top_Table_Date;
