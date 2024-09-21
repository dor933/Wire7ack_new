import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type Searchtypes = 'Quick Action' | 'Search';

interface SearchBarProps {
  SearchType: Searchtypes;
}


export default function SearchBar(props: SearchBarProps) {
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
      >
  
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={props.SearchType==='Quick Action' ? "Quick Action" : props.SearchType==='Search' ? "Search For Connection" : ""}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
       
      </Paper>
    );
  }