import React, { useState } from 'react';
import { Grid, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListSubheader from '@mui/material/ListSubheader';
import '../PaginatedTable.css'; // Custom SCSS for table
import ClearIcon from '@mui/icons-material/Clear';

interface Top_Table_ElementProps {
    ElementName: string;
    Icon: JSX.Element;
    Data: string[];
    SetNewValue? : (value: string) => void;
}

const Top_Table_Element: React.FC<Top_Table_ElementProps> = ({ ElementName, Icon, Data, SetNewValue }) => {
  const [open, setOpen] = useState(false); // State to manage the collapse
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleClick = () => {
    setOpen(!open); // Toggle the open state
  };

  const clearSelectedValue = () => {
    setSelectedValue(null);
    if (SetNewValue) {
      SetNewValue('');
    }
  };

  return (
    <Grid container item xs={2} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: '10px',
        paddingRight: '10px',
        paddingBottom: '3.5px',
      borderRadius: '10px',
      border: '1px solid rgba(48, 76, 87, 0.20)',
      background: '#FFF',
      boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.10)',
    }}>
      <Grid container item xs={12} style={{ }}>
        <Grid item xs={8} style={{
          color: '#304C57',
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
          display: 'flex',
          alignItems: 'center',
          opacity: 0.6,
        }}>
          {
            selectedValue ? selectedValue : ElementName
          }
        
        </Grid>
        <Grid item xs={4} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* The button to toggle the collapsible content */}
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="div"
            aria-labelledby="nested-list-subheader"
          >
            { !selectedValue ?
            <ListItemButton 
              onClick={handleClick} 
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px',
                minHeight: '36px', // Keep the height fixed
              }}
            >
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </ListItemButton> :  <ListItemButton
              onClick={()=>clearSelectedValue()}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px',
                minHeight: '36px', // Keep the height fixed
              }}
              >
                <ClearIcon />
              </ListItemButton>
}
          </List>
        </Grid>
      </Grid>

      {/* The collapsible area */}
      <Grid item xs={12} style={{ width: '100%' }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Data.map((item, index) => (
              <ListItemButton key={index} 
              onClick={() => {
                if (SetNewValue) {
                  SetNewValue(item);
                  setSelectedValue(item);
                  setOpen(false);
                }
              }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default Top_Table_Element;
