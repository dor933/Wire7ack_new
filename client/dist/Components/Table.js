"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const ImportExport_1 = __importDefault(require("@mui/icons-material/ImportExport"));
const KeyboardArrowDown_1 = __importDefault(require("@mui/icons-material/KeyboardArrowDown"));
const KeyboardArrowRight_1 = __importDefault(require("@mui/icons-material/KeyboardArrowRight"));
require("../PaginatedTable.css"); // Custom SCSS for table
// PaginatedTable component
const PaginatedTable = (props) => {
    const [page, setPage] = (0, react_1.useState)(0); // Current page
    const [rowsPerPage, setRowsPerPage] = (0, react_1.useState)(10); // Rows per page
    const [openRows, setOpenRows] = (0, react_1.useState)({}); // Track open rows
    const [filteredrows, setFilteredRows] = (0, react_1.useState)(props.rows);
    const [ProtocolFilter, setProtocolFilter] = (0, react_1.useState)('');
    const [ValidityFilter, setValidityFilter] = (0, react_1.useState)(undefined);
    const [ApplicationProtocolFilter, setApplicationProtocolFilter] = (0, react_1.useState)('');
    const [SourceIPFilter, setSourceIPFilter] = (0, react_1.useState)('');
    const [DestinationIPFilter, setDestinationIPFilter] = (0, react_1.useState)('');
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
    };
    (0, react_1.useEffect)(() => {
        changefilteredrows();
    }, [ProtocolFilter, ApplicationProtocolFilter, SourceIPFilter, DestinationIPFilter, ValidityFilter]);
    const columns = [
        "ID", "Source IP", "Destination IP",
        "Protocol", "Validity", "Start Time", "Duartion", "DataVolume"
    ];
    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page to 0 whenever rows per page changes
    };
    // Toggle the row to show sub-items (packets)
    const toggleRow = (id) => {
        setOpenRows(prevState => (Object.assign(Object.assign({}, prevState), { [id]: !prevState[id] // Toggle the open/close state of the row
         })));
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Paper, { sx: { width: '100%', overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsx)(material_1.TableContainer, { sx: {
                    overflowX: 'auto',
                }, children: (0, jsx_runtime_1.jsxs)(material_1.Table, { stickyHeader: true, "aria-label": "customized table", children: [(0, jsx_runtime_1.jsx)(material_1.TableHead, { children: (0, jsx_runtime_1.jsxs)(material_1.TableRow, { className: "custom-header-row", children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, {}), columns.map((column, index) => ((0, jsx_runtime_1.jsx)(material_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)("span", { children: column }), (0, jsx_runtime_1.jsx)(ImportExport_1.default, { style: {
                                                        color: "#304C57",
                                                        fontSize: "16px",
                                                        marginLeft: 'auto' // Ensure icon stays to the far right
                                                    } })] }) }, index)))] }) }), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: filteredrows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { "aria-label": "expand row", size: "small", onClick: () => toggleRow(row.Index), children: openRows[row.Index] ? (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, {}) : (0, jsx_runtime_1.jsx)(KeyboardArrowRight_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: row.connectionID }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: row.SourceIP }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: row.DestinationIP }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: row.Protocol }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: row.validity }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: row.StartTime.toString() }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: row.Duration }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: row.DataVolume.toString() })] }), (0, jsx_runtime_1.jsx)(material_1.TableRow, { children: (0, jsx_runtime_1.jsx)(material_1.TableCell, { style: { paddingBottom: 0, paddingTop: 0, }, colSpan: 12, children: (0, jsx_runtime_1.jsx)(material_1.Collapse, { in: openRows[row.Index], timeout: "auto", unmountOnExit: true, children: (0, jsx_runtime_1.jsx)(material_1.Box, { margin: 1, children: (0, jsx_runtime_1.jsxs)(material_1.TableContainer, { sx: { overflowX: 'auto' }, children: [(0, jsx_runtime_1.jsx)("h4", { children: "Packets" }), (0, jsx_runtime_1.jsxs)(material_1.Table, { size: "small", "aria-label": "packets", children: [(0, jsx_runtime_1.jsx)(material_1.TableHead, { children: (0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Packet ID" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Size (Bytes)" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Source IP" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Destination IP" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Protocol" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Payload" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Activation ID" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Source MAC" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Destination MAC" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Source Port" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Destination Port" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Flags" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Frame Length" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Connection ID" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Interface and Protocol" }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: "Timestamp" })] }) }), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: row.Packets.map((packet) => ((0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.PacketID }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.Size }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.SourceIP }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.DestinationIP }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.Protocol }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.Payload }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.ActivationID }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.sourceMAC }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.destinationMAC }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.sourcePort }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.DestPort }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.flags }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.frameLength }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.connectionID }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.Interface_and_protocol }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { children: packet.Timestamp.toString() })] }, packet.PacketID))) })] })] }) }) }) }) })] }, index))) })] }) }), (0, jsx_runtime_1.jsx)(material_1.TablePagination, { component: "div", count: filteredrows.length, page: page, onPageChange: handleChangePage, rowsPerPage: rowsPerPage, onRowsPerPageChange: handleChangeRowsPerPage, rowsPerPageOptions: [5, 10, 25] })] }));
};
exports.default = PaginatedTable;
