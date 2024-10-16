import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';

type Searchtypes = 'Quick Action' | 'Search';

interface SearchBarProps {
  SearchType: Searchtypes;
  Fields?: Record<string, string>;
  setChosenFields?: React.Dispatch<React.SetStateAction<Record<string, string>>>; // Allows parent to set chosen fields
}

export default function SearchBar(props: SearchBarProps) {
  // Local state to store the input text as the user types
  const [inputValue, setInputValue] = React.useState<string>('');
  const [isusertyping,setIsUserTyping]=React.useState<boolean>(false);
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserTyping(true);
    setInputValue(event.target.value); // Update the local input value state as the user types
  };

  const handleBlur=()=>{
    setIsUserTyping(false);
    handleFieldChange();
  }
  // Handler for when the user leaves the input field (onBlur event)
  const handleFieldChange = () => {
    // Split the input by ', ' to separate the fields
    //REMOVE space between , 
    const fieldEntries = inputValue.split(',').map(entry => entry.trim());
  
    const newFields: Record<string, string> = {};
    const fieldexits:string[]=[];
  
    fieldEntries.forEach(entry => {
      const [field, valuesString] = entry.split(':').map(part => part.trim());


      if(fieldexits.includes(field)){
        alert(`Field-${field} already exists`);
        setInputValue('');
        props.setChosenFields!({});
        return;
      }

      const fieldlowercase=field.toLowerCase();
      //write in regex if field is not equal to ip host 1-5
      if( (RegExp('ip host [1-5]').test(fieldlowercase) || fieldlowercase==='protocols') && valuesString.length>0){
        newFields[fieldlowercase] = valuesString;
        fieldexits.push(fieldlowercase);
      }

      else{
        alert(`Invalid Field-${fieldlowercase}`);
        setInputValue('');
        props.setChosenFields!({});
      }
     
      
      
    });

    console.log(newFields);
  
    if (props.setChosenFields) {
      props.setChosenFields(newFields); // Update parent state
    }
  };

  // Render the SearchBar component
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={
          props.SearchType === 'Quick Action'
            ? 'Quick Action'
            : props.SearchType === 'Search'
            ? 'Add Filters'
            : ''
        }
        inputProps={{ 'aria-label': 'search google maps' }}
        value={inputValue} // Display the current input value
        onChange={handleInputChange} // Capture the input as the user types
        onBlur={handleBlur} // Process the input when the user leaves the field
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleFieldChange}>
          {isusertyping?<CheckIcon/>:<SearchIcon />}
      </IconButton>
    </Paper>
  );
}
