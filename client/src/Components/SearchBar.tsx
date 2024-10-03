import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type Searchtypes = 'Quick Action' | 'Search';

interface SearchBarProps {
  SearchType: Searchtypes;
  Fields?: Record<string, string[]>;
  setChosenFields?: React.Dispatch<React.SetStateAction<Record<string, string[]>>>; // Allows parent to set chosen fields
}

export default function SearchBar(props: SearchBarProps) {
  // Local state to store the input text as the user types
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the local input value state as the user types
  };

  // Handler for when the user leaves the input field (onBlur event)
  const handleFieldChange = () => {
    // Split the input by ', ' to separate the fields
    const fieldEntries = inputValue.split(' , ').map(entry => entry.trim());
  
    const newFields: Record<string, string[]> = {};
  
    fieldEntries.forEach(entry => {
      const [field, valuesString] = entry.split(':').map(part => part.trim());
  
      if (field && valuesString) {
        // Split the valuesString by ',' to get individual values
        const values = valuesString.split(',').map(value => value.trim());
        newFields[field] = values;
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
        onBlur={handleFieldChange} // Process the input when the user leaves the field
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
