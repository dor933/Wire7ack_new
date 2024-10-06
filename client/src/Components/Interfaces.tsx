import React, { useState } from 'react';
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { KeyboardArrowRight } from '@mui/icons-material';

interface InterfacesProps {
  ElementName: string;
  Icon: JSX.Element;
  Data: string[];
  SetNewValue?: (value: string) => void;
  useTextInput?: boolean; // Determines if TextField is used
}

const Interfaces: React.FC<InterfacesProps> = ({
  ElementName,
  Icon,
  Data,
  SetNewValue,
  useTextInput,
}) => {
  const [open, setOpen] = useState(false); // State to manage the collapse
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleClick = () => {
    setOpen(!open); // Toggle the open state
  };

  const clearSelectedValue = () => {
    setSelectedValue('');
    if (SetNewValue) {
      SetNewValue('');
    }
  };

  return (
    <Grid
      container
      item
      xs={2}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    
      
        position: 'relative',
      }}
    >
      <Grid container item xs={10} style={{
          borderRadius: '10px',
          border: '1px solid rgba(48, 76, 87, 0.20)',
          background: '#FFF',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.10)',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingBottom: '7.5px',
          paddingTop: '7.5px',
          justifyContent:'space-between',
          minHeight: '58px',


      }}>
        <Grid
          item
          xs={8}
          style={{
            color: '#304C57',
            fontFamily: 'Roboto',
            
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.6,
            justifyContent: 'flex-start', // Center the text
          }}
        >
         {selectedValue ? selectedValue : ElementName}
        </Grid>

          <Grid
            item
            xs={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* The button to toggle the collapsible content */}
            {selectedValue ? (
              <ClearIcon
                onClick={clearSelectedValue}
                style={{
                  cursor: 'pointer',
                }}
              />
            ) : (
              <ListItemButton
                onClick={handleClick}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '36px', // Keep the height fixed
                }}
              >
                {open ?  Icon : <KeyboardArrowRight style={{
                    color: '#000000',
                    fontSize: '23px',
                    }}/>
                }
              </ListItemButton>
            )}
          </Grid>
      </Grid>

      {/* The collapsible area */}
        <Grid item xs={12} style={{ width: '100%' }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                width: '100%',
                backgroundColor: '#FFF',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {Data.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => {
                    setSelectedValue(item);
                    if (SetNewValue) {
                      SetNewValue(item);
                    }
                    setOpen(false);
                  }}
                  sx={{
                    justifyContent: 'center', // Center the list items
                  }}
                >
                  <ListItemText
                    primary={item}
                    sx={{
                      textAlign: 'left', // Center the text
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Grid>
    </Grid>
  );
};

export default Interfaces;
