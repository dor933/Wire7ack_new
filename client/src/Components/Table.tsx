import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, IconButton, Collapse, Box,
  Tab
} from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {Packet} from '../../../shared/Packet';
import {Stream} from '../../../shared/Stream';
import '../PaginatedTable.css'; // Custom SCSS for table
import { Key } from '@mui/icons-material';





// Sample data

interface PaginatedTableProps {
    rows: Stream[];
    }


// PaginatedTable component
const PaginatedTable: React.FC<PaginatedTableProps> = (props) => {
  const [page, setPage] = useState<number>(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState<number>(10); // Rows per page
  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({}); // Track open rows
  const [filteredrows, setFilteredRows] = useState<Stream[]>(props.rows);
  const [ProtocolFilter, setProtocolFilter] = useState<string>('');
const [ValidityFilter, setValidityFilter] = useState<boolean|undefined>(undefined);
const [ApplicationProtocolFilter, setApplicationProtocolFilter] = useState<string>('');
const [SourceIPFilter, setSourceIPFilter] = useState<string>('');
const [DestinationIPFilter, setDestinationIPFilter] = useState<string>('');








  const changefilteredrows = () => {

    let temprows = props.rows.filter((row) => {
      if (ProtocolFilter !== '' && row.Protocol !== ProtocolFilter) {
        return false;
      }
      if (ValidityFilter !== undefined && row.validity !== ValidityFilter) {
        return false;
      }
      if (ApplicationProtocolFilter !== '' && row.ApplicationProtocol !== ApplicationProtocolFilter) {
        return false;
      }
      if (SourceIPFilter !== '' && row.SourceIP !== SourceIPFilter) {
        return false;
      }
      if (DestinationIPFilter !== '' && row.DestinationIP !== DestinationIPFilter) {
        return false;
      }
   
      return true;
    });
    setFilteredRows(temprows);
  }

  useEffect(() => {
    changefilteredrows();
  }
    , [ProtocolFilter, ApplicationProtocolFilter, SourceIPFilter, DestinationIPFilter, ValidityFilter]);

  const columns: string[] = [
    "ID", "Source IP", "Destination IP", 
    "Protocol", "Validity", "Start Time", "Duartion", "DataVolume"
  ];

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 whenever rows per page changes
  };

  // Toggle the row to show sub-items (packets)
  const toggleRow = (id: number) => {
    setOpenRows(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the open/close state of the row
    }));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{
        overflowX: 'auto',
        
      }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow className="custom-header-row">
              <TableCell />
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{column}</span>
                    <ImportExportIcon
                      style={{
                        color: "#304C57",
                        fontSize: "16px",
                        marginLeft: 'auto' // Ensure icon stays to the far right
                      }}
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredrows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => toggleRow(row.Index)}
                    >
                      {openRows[row.Index] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.connectionID}</TableCell>
                  <TableCell>{row.SourceIP}</TableCell>
                  <TableCell>{row.DestinationIP}</TableCell>
                  <TableCell>{row.Protocol}</TableCell>
                  <TableCell>{row.validity}</TableCell>
                  <TableCell>{row.StartTime.toString()}</TableCell>
                  <TableCell>{row.Duration}</TableCell>
                  <TableCell>{row.DataVolume.toString()}</TableCell>
                </TableRow>

                {/* Collapsible Row for Packets */}
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={12}>
                    <Collapse in={openRows[row.Index]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                      <TableContainer sx={{ overflowX: 'auto' }}>
                        <h4>Packets</h4>
                        <Table size="small" aria-label="packets">
                                                      <TableHead>
                            <TableRow>
                              <TableCell>Packet ID</TableCell>
                              <TableCell>Size (Bytes)</TableCell>
                                <TableCell>Source IP</TableCell>
                                <TableCell>Destination IP</TableCell>
                                <TableCell>Protocol</TableCell>
                                <TableCell>Payload</TableCell>
                                <TableCell>Activation ID</TableCell>
                                <TableCell>Source MAC</TableCell>
                                <TableCell>Destination MAC</TableCell>
                                <TableCell>Source Port</TableCell>
                                <TableCell>Destination Port</TableCell>
                                <TableCell>Flags</TableCell>
                                <TableCell>Frame Length</TableCell>
                                <TableCell>Connection ID</TableCell>
                                <TableCell>Interface and Protocol</TableCell>

                              <TableCell>Timestamp</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.Packets.map((packet) => (
                              <TableRow key={packet.PacketID}>
                                <TableCell>{packet.PacketID}</TableCell>
                                <TableCell>{packet.Size}</TableCell>
                                <TableCell>{packet.SourceIP}</TableCell>
                                <TableCell>{packet.DestinationIP}</TableCell>
                                <TableCell>{packet.Protocol}</TableCell>
                                <TableCell>{packet.Payload}</TableCell>
                                <TableCell>{packet.ActivationID}</TableCell>
                                <TableCell>{packet.sourceMAC}</TableCell>
                                <TableCell>{packet.destinationMAC}</TableCell>
                                <TableCell>{packet.sourcePort}</TableCell>
                                <TableCell>{packet.DestPort}</TableCell>
                                <TableCell>{packet.flags}</TableCell>
                                <TableCell>{packet.frameLength}</TableCell>
                                <TableCell>{packet.connectionID}</TableCell>
                                <TableCell>{packet.Interface_and_protocol}</TableCell>
                                <TableCell>{packet.Timestamp.toString()}</TableCell>


                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        </TableContainer>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredrows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default PaginatedTable;
