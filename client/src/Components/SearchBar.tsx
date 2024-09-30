import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type Searchtypes = 'Quick Action' | 'Search';

interface SearchBarProps {
  SearchType: Searchtypes;
  Fields?: string[];
}



export default function SearchBar(props: SearchBarProps) {

  const [MyFields, setMyFields] = React.useState<string[]>(props.Fields? props.Fields : []);

  React.useEffect(() => {
    setMyFields(props.Fields? props.Fields : []);
  }
  , [props.Fields]);


  
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
            MyFields?.map((field, index) => (
              field + ":" +" "
            ))
          }
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
       
      </Paper>
    );
  }