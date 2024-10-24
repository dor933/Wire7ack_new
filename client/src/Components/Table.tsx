import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, IconButton, Collapse, Box, Tooltip, Typography
} from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Stream } from '../shared/Stream';
import '../PaginatedTable.css'; // Custom SCSS for table
import { useGlobal } from "./Context/Global";
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

type Time_order = 'desc' | 'asc';

interface PaginatedTableProps {
  rows: Stream[];
  ProtocolFilter: string;
  ValidityFilter: boolean | undefined;
  FlagsFilter: string;
  SourceIPFilter: string;
  DestinationIPFilter: string;
  starttimedate: string;
  endtimedate: string;
  invalid_streams: Stream[];
  historic_streams: Stream[];
  time_order:Time_order;
}

const PaginatedTable: React.FC<PaginatedTableProps> = (props) => {

  const [visiblerows, setVisiblerows] = useState<Stream[]>(props.rows);
  const [page, setPage] = useState<number>(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState<number>(10); // Rows per page
  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({}); // Track open rows
  const [filteredRows, setFilteredRows] = useState<Stream[]>(props.rows);
  const {View} = useGlobal()
  const {last_stream_id} = useGlobal();

  useEffect(() => {

    if(View === 'Error Connections'){
      setVisiblerows(props.invalid_streams);
    }

    else if(View === 'Warning Connections'){
      setVisiblerows([]);
    }
    else if(View==='Historic Connections'){
      setVisiblerows(props.historic_streams);
    }
    else{
    setVisiblerows(props.rows);
    }
  }
  , [props.rows,props.invalid_streams,props.historic_streams,View]);





  const ProtocolFilter = props.ProtocolFilter;
  const ValidityFilter = props.ValidityFilter;
  const FlagsFilter = props.FlagsFilter;
  const SourceIPFilter = props.SourceIPFilter;
  const DestinationIPFilter = props.DestinationIPFilter;
  const starttimedate = new Date(props.starttimedate);
  const endtimedate = new Date(props.endtimedate);

 
  const handlechage_historic_streams = async () => {
    try {
      const response = await axios.get('http://localhost:80/GetStream', {
        params: {
          pagenum: page,
          pagesize: rowsPerPage,
          last_stream_id: last_stream_id,
          Protocol: props.ProtocolFilter || undefined, // Optional parameter
          Timedirection: props.time_order, // Use props.time_order
          validity: props.ValidityFilter,
          sourceip: props.SourceIPFilter,
          destip: props.DestinationIPFilter,
          startTime: props.starttimedate,
          endTime: props.endtimedate,
        },
      });

      setFilteredRows(response.data);
    } catch (error) {
      console.error('Error fetching historic streams:', error);
    }
  };

  // Function to update filtered rows based on filters
  const changeFilteredRows = () => {

    if(View==='Historic Connections'){
      handlechage_historic_streams();
    }
    else{
    let index=0;
    let tempRows = visiblerows.filter((row) => {

      row.index=index;
      index++;
      

      if (ProtocolFilter !== '' && row.Protocol !== ProtocolFilter) {
        return false;
      }

      if (starttimedate !== null && row.StartTime < starttimedate) {
        return false;
      }

      if (endtimedate !== null && row.EndTime > endtimedate) {
        return false;
      }

      if (ValidityFilter !== undefined && row.validity !== ValidityFilter) {
        return false;
      }
      if (
        FlagsFilter !== '' &&
        row.Packets.map((packet) => packet.flags).includes(FlagsFilter) === false
      ) {
        return false;
      }
      if (SourceIPFilter !== '' && !row.SourceIP.includes(SourceIPFilter)) {
        return false;
      }
      if (DestinationIPFilter !== '' && !row.DestinationIP.includes(DestinationIPFilter)) {
        return false;
      }
      return true;
    });
    setFilteredRows(tempRows);
    setPage(0); // Reset page to 0 whenever filters change
  }
  };

 

  // Update filteredRows when filters or props.rows change
  useEffect(() => {
    changeFilteredRows();
  }, [
    visiblerows,
    ProtocolFilter,
    FlagsFilter,
    SourceIPFilter,
    DestinationIPFilter,
    ValidityFilter,
    
  ]);

  const columns: string[] = [
    'ID',
    'Source IP',
    'Destination IP',
    'Protocol',
    'Validity',
    'Start Time',
    'Duration',
    'Data Volume',
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
  const toggleRow = (index: number) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    setOpenRows({});
  }, [page, rowsPerPage]);

  const flagsTooltip = (
    <Box>
    <Typography variant="subtitle1" fontWeight="bold">TCP Flags:</Typography>
    <Typography variant="body2">
      <b>FIN (0x01):</b> "Goodbye!" - Politely ends the conversation.<br/>
      <b>SYN (0x02):</b> "Hello!" - Starts a conversation between devices.<br/>
      <b>RST (0x04):</b> "Oops!" - Abruptly ends the conversation due to an error.<br/>
      <b>PSH (0x08):</b> "Urgent!" - Asks to process this data immediately.<br/>
      <b>ACK (0x10):</b> "Got it!" - Confirms receiving information.<br/>
      <b>URG (0x20):</b> "Look here!" - Points out important data in the packet.<br/>
      <b>ECE (0x40):</b> "Traffic alert!" - Warns about network congestion.<br/>
      <b>CWR (0x80):</b> "Slowing down!" - Responds to congestion warning.<br/>
      <b>NS (0x100):</b> "Security check!" - Helps ensure the packet hasn't been tampered with.
    </Typography>
    <Typography variant="subtitle1" fontWeight="bold" mt={1}>Common Combinations:</Typography>
    <Typography variant="body2">
      <b>0x00 (No flags):</b> "Just passing through" - Normal data transfer, no special actions needed.<br/>
      <b>0x02 (SYN):</b> Start conversation<br/>
      <b>0x12 (SYN+ACK):</b> Acknowledge conversation start<br/>
      <b>0x10 (ACK):</b> Acknowledge received data<br/>
      <b>0x18 (PSH+ACK):</b> "Got it, please process this urgently!"<br/>
      <b>0x11 (FIN+ACK):</b> "I'm done sending, but still listening"<br/>
      <b>0x04 (RST):</b> Forcefully terminate the connection <br/>
      <b>0x14 (RST+ACK):</b> "I got your message, but I'm forcefully ending this conversation"

    </Typography>
  </Box>
  );
  const tcpFlagsTooltip = (
    <Box>
    <Typography variant="subtitle1" fontWeight="bold">TCP Flags:</Typography>
    <Typography variant="body2">
      <b>FIN (0x01):</b> "Goodbye!" - Politely ends the conversation.<br/>
      <b>SYN (0x02):</b> "Hello!" - Starts a conversation between devices.<br/>
      <b>RST (0x04):</b> "Oops!" - Abruptly ends the conversation due to an error.<br/>
      <b>PSH (0x08):</b> "Urgent!" - Asks to process this data immediately.<br/>
      <b>ACK (0x10):</b> "Got it!" - Confirms receiving information.<br/>
      <b>URG (0x20):</b> "Look here!" - Points out important data in the packet.<br/>
      <b>ECE (0x40):</b> "Traffic alert!" - Warns about network congestion.<br/>
      <b>CWR (0x80):</b> "Slowing down!" - Responds to congestion warning.<br/>
      <b>NS (0x100):</b> "Security check!" - Helps ensure the packet hasn't been tampered with.
    </Typography>
    <Typography variant="subtitle1" fontWeight="bold" mt={1}>Common Combinations:</Typography>
    <Typography variant="body2">
      <b>0x00 (No flags):</b> "Just passing through" - Normal data transfer, no special actions needed.<br/>
      <b>0x02 (SYN):</b> Start conversation<br/>
      <b>0x12 (SYN+ACK):</b> Acknowledge conversation start<br/>
      <b>0x10 (ACK):</b> Acknowledge received data<br/>
      <b>0x18 (PSH+ACK):</b> "Got it, please process this urgently!"<br/>
      <b>0x11 (FIN+ACK):</b> "I'm done sending, but still listening"<br/>
      <b>0x04 (RST):</b> Forcefully terminate the connection <br/>
      <b>0x14 (RST+ACK):</b> "I got your message, but I'm forcefully ending this conversation"

    </Typography>
  </Box>
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow className="custom-header-row">
              <TableCell />
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{column}</span>
                    <ImportExportIcon
                      style={{
                        color: '#304C57',
                        fontSize: '16px',
                        marginLeft: 'auto', // Ensure icon stays to the far right
                      }}
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Use filteredRows instead of props.rows */}
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                
                <React.Fragment key={index}>
                  <TableRow className={row.validity === false ? 'stream-error' : ''}
                  >
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => toggleRow(row.index!)}
                      >
                        {openRows[row.index!] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.connectionID}</TableCell>
                    <TableCell>{row.SourceIP}</TableCell>
                    <TableCell>{row.DestinationIP}</TableCell>
                    <TableCell>{row.Protocol}</TableCell>
                    <TableCell>{row.validity.toString()}</TableCell>
                    <TableCell>{row.StartTime.toString()}</TableCell>
                    <TableCell>{row.Duration}</TableCell>
                    <TableCell>{row.DataVolume.toString()}</TableCell>
                  </TableRow>

                  {/* Collapsible Row for Packets */}
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                      <Collapse in={openRows[row.index!]} timeout="auto" unmountOnExit>
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
                                  <TableCell>
                                  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start', 
                                      gap:'5px',
                                      width:'100%',
                                      padding:'5px',
                                      borderRadius:'5px',
                                      backgroundColor:'#f0f0f0',
                                    }}>
   <Tooltip title={flagsTooltip} arrow placement="top">
                                      <IconButton size="small">
                                        <InfoIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <span>Flags</span>
                                    </div>


                               

                                  </TableCell>
                                  <TableCell>Frame Length</TableCell>
                                  <TableCell>Connection ID</TableCell>
                                  <TableCell>Interface and Protocol</TableCell>
                                  <TableCell>Timestamp</TableCell>
                                  {/* New columns for error detection */}
                                  <TableCell>
                                    
                                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start', 
                                      gap:'5px',
                                      width:'100%',
                                      padding:'5px',
                                      borderRadius:'5px',
                                      backgroundColor:'#f0f0f0',
                                    }}>

                                    <Tooltip title={tcpFlagsTooltip} arrow placement="top">
                                      <IconButton size="small">
                                        <InfoIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>

                                    <span>TCP Flags</span>


                                    </div>

                             

                                 

                                  </TableCell>
                                  <TableCell>TCP Seq</TableCell>
                                  <TableCell>TCP Ack</TableCell>
                                  <TableCell>TCP Checksum Status</TableCell>
                                  <TableCell>UDP Checksum Status</TableCell>
                                  <TableCell>ICMP Type</TableCell>
                                  <TableCell>ICMP Code</TableCell>
                                  <TableCell>ICMP Checksum Status</TableCell>
                                  <TableCell>ARP Opcode</TableCell>
                                  <TableCell>IP Checksum Status</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row.Packets.map((packet) => (
                                  <TableRow key={packet.PacketID} className={packet.errorIndicator ? 'packet-error' : ''}>
                                    <TableCell>{packet.PacketID}</TableCell>
                                    <TableCell>{packet.Size}</TableCell>
                                    <TableCell>{packet.SourceIP}</TableCell>
                                    <TableCell>{packet.DestinationIP}</TableCell>
                                    <TableCell>{packet.Protocol}</TableCell>
                                    <TableCell>{packet.Payload}</TableCell>
                                    <TableCell>{packet.ActivationID}</TableCell>
                                    <TableCell>{packet.sourceMAC}</TableCell>
                                    <TableCell>{packet.destinationMAC}</TableCell>
                                    <TableCell>{packet.sourcePort || 'N/A'}</TableCell>
                                    <TableCell>{packet.DestPort || 'N/A'}</TableCell>
                                    <TableCell>{packet.flags || 'N/A'}</TableCell>
                                    <TableCell>{packet.frameLength}</TableCell>
                                    <TableCell>{packet.connectionID}</TableCell>
                                    <TableCell>{packet.Interface_and_protocol}</TableCell>
                                    <TableCell>{packet.Timestamp.toString()}</TableCell>
                                    {/* New columns for error detection */}
                                    <TableCell>
                                      {packet.tcpFlags
                                        ? Object.entries(packet.tcpFlags)
                                            .filter(([key, value]) => value)
                                            .map(([key]) => key.toUpperCase())
                                            .join(', ')
                                        : 'N/A'}
                                    </TableCell>
                                    <TableCell>{packet.tcpSeq !== undefined ? packet.tcpSeq : 'N/A'}</TableCell>
                                    <TableCell>{packet.tcpAck !== undefined ? packet.tcpAck : 'N/A'}</TableCell>
                                    <TableCell>
                                      {packet.tcpChecksumStatus !== undefined
                                        ? getChecksumStatus(packet.tcpChecksumStatus)
                                        : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                      {packet.udpChecksumStatus !== undefined
                                        ? getChecksumStatus(packet.udpChecksumStatus)
                                        : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                      {packet.icmpType !== undefined ? packet.icmpType : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                      {packet.icmpCode !== undefined ? packet.icmpCode : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                      {packet.icmpChecksumStatus !== undefined
                                        ? getChecksumStatus(packet.icmpChecksumStatus)
                                        : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                      {packet.arpOpcode !== undefined ? packet.arpOpcode : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                      {packet.ipChecksumStatus !== undefined
                                        ? getChecksumStatus(packet.ipChecksumStatus)
                                        : 'N/A'}
                                    </TableCell>
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
        count={filteredRows.length} // Use filteredRows length for pagination
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

// Helper function to interpret checksum status
function getChecksumStatus(status: number): string {
  switch (status) {
    case 0:
      return 'Not Verified';
    case 1:
      return 'Bad';
    case 2:
      return 'Good';
    default:
      return 'Unknown';
  }
}

export default PaginatedTable;
