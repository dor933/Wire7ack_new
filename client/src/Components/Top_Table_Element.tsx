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
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

interface Top_Table_ElementProps {
  ElementName: string;
  Icon: JSX.Element;
  Data: string[];
  SetNewValue?: (value: string) => void;
  useTextInput?: boolean; // Determines if TextField is used
}

const Top_Table_Element: React.FC<Top_Table_ElementProps> = ({
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
        justifyContent: 'center',
        paddingLeft: useTextInput?'0px': '10px',
        paddingRight: useTextInput? '0px': '10px',
        minHeight: '54px',
        paddingBottom:useTextInput? '0px': '3.5px',
        borderRadius: '10px',
        border: '1px solid rgba(48, 76, 87, 0.20)',
        background: '#FFF',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      <Grid container item xs={12}>
        <Grid
          item
          xs={useTextInput ? 12 : 8}
          style={{
            color: '#304C57',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.6,
          }}
        >
          {useTextInput ? (
            <TextField
              fullWidth
              placeholder={ElementName}
              
              value={selectedValue}
              onChange={(e) => {
                setSelectedValue(e.target.value);
                if (SetNewValue) {
                  SetNewValue(e.target.value);
                }
              }}
              InputProps={{
                style: {
                  fontSize: '14px',
                  color: '#304C57',
                  fontWeight: 400,
                  opacity:1
                },
              }}
            />
          ) : (
            selectedValue || ElementName
          )}
        </Grid>

        {!useTextInput && (
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
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  padding: '0px',
                  minHeight: '36px', // Keep the height fixed
                }}
              >
                {open ? Icon : <KeyboardArrowRight style={{
                   color: "#000000",
                   fontSize: "23px",
                   marginTop: "5px",
                }} />}
              </ListItemButton>
            )}
          </Grid>
        )}
      </Grid>

      {/* The collapsible area */}
      {!useTextInput && (
        <Grid item xs={12} style={{ width: '100%' }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
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
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Grid>
      )}
    </Grid>
  );
};

export default Top_Table_Element;
