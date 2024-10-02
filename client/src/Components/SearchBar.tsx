import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type Searchtypes = 'Quick Action' | 'Search';

interface SearchBarProps {
  SearchType: Searchtypes;
  Fields?: Record<string,string[]>;
}



export default function SearchBar(props: SearchBarProps) {

const [MyFields, setMyFields] = React.useState<Record <string,string[]>>({})  


  React.useEffect(() => {
    // Ensure that if props.Fields is undefined, we fall back to an empty object
    setMyFields(props.Fields ? props.Fields : {});
  }, [props.Fields]);

  
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
      >
  
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={props.SearchType==='Quick Action' ? "Quick Action" : props.SearchType==='Search' ? "Add Filters" : ""}
          inputProps={{ 'aria-label': 'search google maps' }} value=
          
          {
            Object.keys(MyFields).map((field) => {
              // Join the array of values with commas, and then concatenate with the key
              return field + ": " + MyFields[field].join(', ');
            })
            
          }
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
       
      </Paper>
    );
  }