import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, IconButton, Collapse, Box
} from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Stream } from '../shared/Stream';
import { Packet } from '../shared/Packet';
import '../PaginatedTable.css'; // Custom SCSS for table
import { useGlobal } from "./Context/Global";

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
}

const PaginatedTable: React.FC<PaginatedTableProps> = (props) => {

  const [visiblerows, setVisiblerows] = useState<Stream[]>(props.rows);
  const [page, setPage] = useState<number>(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState<number>(10); // Rows per page
  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({}); // Track open rows
  const [filteredRows, setFilteredRows] = useState<Stream[]>(props.rows);
  const {View} = useGlobal()

  useEffect(() => {

    if(View === 'Error Connections'){
      setVisiblerows(props.invalid_streams);
    }

    else if(View === 'Warning Connections'){
      setVisiblerows([]);
    }
    else{
    setVisiblerows(props.rows);
    }
  }
  , [props.rows,props.invalid_streams,View]);



  function isPacketError(packet: Packet): boolean {
    // Check IP checksum status
    if (packet.ipChecksumStatus === 1) {
      return true;
    }

    if(packet.Protocol === 'TCP'){
      // Check for TCP RST flag
      if (packet.tcpFlags && packet.tcpFlags.rst) {
        return true;
      }
      if (packet.tcpChecksumStatus === 1) {
        return true;
      }
    }
  
      
    // Check UDP checksum status
    if (packet.udpChecksumStatus === 1) {
      return true;
    }
  
    // Check ICMP checksum status
    if (packet.icmpChecksumStatus === 1) {
      return true;
    }
  
 
    return false; // No errors detected
  }

  const ProtocolFilter = props.ProtocolFilter;
  const ValidityFilter = props.ValidityFilter;
  const FlagsFilter = props.FlagsFilter;
  const SourceIPFilter = props.SourceIPFilter;
  const DestinationIPFilter = props.DestinationIPFilter;
  const starttimedate = new Date(props.starttimedate);
  const endtimedate = new Date(props.endtimedate);

  // Function to update filtered rows based on filters
  const changeFilteredRows = () => {
    let tempRows = visiblerows.filter((row) => {
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
      if (SourceIPFilter !== '' && row.SourceIP !== SourceIPFilter) {
        return false;
      }
      if (DestinationIPFilter !== '' && row.DestinationIP !== DestinationIPFilter) {
        return false;
      }
      return true;
    });
    setFilteredRows(tempRows);
    setPage(0); // Reset page to 0 whenever filters change
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
  const toggleRow = (id: number) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the open/close state of the row
    }));
  };

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
                        onClick={() => toggleRow(row.Index)}
                      >
                        {openRows[row.Index] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
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
                                  {/* New columns for error detection */}
                                  <TableCell>TCP Flags</TableCell>
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
                                  <TableRow key={packet.PacketID} className={isPacketError(packet) ? 'packet-error' : ''}>
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
