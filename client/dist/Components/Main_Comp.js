"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../App.css");
const react_1 = require("react");
const material_1 = require("@mui/material");
const FilterAlt_1 = __importDefault(require("@mui/icons-material/FilterAlt"));
const SearchBar_1 = __importDefault(require("./SearchBar"));
const Top_Table_Element_1 = __importDefault(require("./Top_Table_Element"));
const KeyboardArrowDown_1 = __importDefault(require("@mui/icons-material/KeyboardArrowDown"));
const HighlightOff_1 = __importDefault(require("@mui/icons-material/HighlightOff"));
const Table_1 = __importDefault(require("./Table"));
const Top_Table_Date_1 = __importDefault(require("./Top_Table_Date"));
const material_2 = require("@mui/material");
const Main_Comp = (props) => {
    const newrows = props.rows;
    const [ChosenFields, setChosenFields] = (0, react_1.useState)([]);
    const [ProtocolFilter, setProtocolFilter] = (0, react_1.useState)('');
    const [ValidityFilter, setValidityFilter] = (0, react_1.useState)(undefined);
    const [FlagsFilter, setFlagsFilter] = (0, react_1.useState)('');
    const [SourceIPFilter, setSourceIPFilter] = (0, react_1.useState)('');
    const [DestinationIPFilter, setDestinationIPFilter] = (0, react_1.useState)('');
    const [isfiltervisible, setisfiltervisible] = (0, react_1.useState)(false);
    const [startdatetime, setstartdatetime] = (0, react_1.useState)('');
    const [enddatetime, setenddatetime] = (0, react_1.useState)('');
    const handleclearall = () => {
        props.setrows([]);
    };
    (0, react_1.useEffect)(() => {
    }, [startdatetime, enddatetime, ProtocolFilter, ValidityFilter, FlagsFilter, SourceIPFilter, DestinationIPFilter]);
    console.log('new rows are', newrows);
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, style: {
            width: "95%",
            padding: "30px",
            flexDirection: "column",
            gap: "20px",
            flexShrink: "0",
            alignItems: "flex-end",
        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 12, style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                    flexDirection: "row",
                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 6, style: {
                            flexDirection: "column",
                            gap: "10px",
                            display: "flex",
                            alignItems: "flex-start",
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, style: {
                                    fontSize: "28px",
                                    fontWeight: "600",
                                    lineHeight: "normal",
                                    color: "#120213",
                                    fontFamily: "Roboto",
                                    marginBottom: "10px",
                                }, children: "Connections DATA" }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, style: {
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "normal",
                                    color: "#304C57",
                                    fontFamily: "Roboto",
                                    opacity: "0.7"
                                }, children: "Each connection is a record of a network connection between this device and another." }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, style: {
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "normal",
                                    color: "#304C57",
                                    fontFamily: "Roboto",
                                    opacity: "0.7"
                                }, children: "Within each connection, you can find the packets that were sent and received." })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 6, style: {
                            flexDirection: "row",
                            gap: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { onClick: () => { setisfiltervisible(!isfiltervisible); }, container: true, item: true, xs: 4, xl: 2, style: {
                                    display: "flex",
                                    padding: "10px 10px",
                                    alignItems: "center",
                                    borderRadius: "10px",
                                    background: "rgba(64, 75, 137, 0.10)",
                                    cursor: "pointer",
                                }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 2, children: (0, jsx_runtime_1.jsx)(FilterAlt_1.default, { style: {
                                                color: "#326591",
                                                fontSize: "23px",
                                                marginTop: "5px",
                                            } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 10, style: {
                                            color: "#326591",
                                            fontFamily: "Roboto",
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            fontStyle: "normal",
                                            lineHeight: "normal",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }, children: isfiltervisible ? "Hide Filters" : "Show Filters" })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 4, children: (0, jsx_runtime_1.jsx)(SearchBar_1.default, { SearchType: "Search", Fields: ChosenFields }) })] })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 12, style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "stretch",
                    flexDirection: "row",
                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 8, style: {
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                        }, children: [(0, jsx_runtime_1.jsx)(Top_Table_Date_1.default, { ElementName: "Start Time", Icon: (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, { style: {
                                        color: "#326591",
                                        fontSize: "23px",
                                        marginTop: "5px",
                                    } }), SetNewValue: setstartdatetime }), (0, jsx_runtime_1.jsx)(Top_Table_Date_1.default, { ElementName: "End Time", Icon: (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, { style: {
                                        color: "#326591",
                                        fontSize: "23px",
                                        marginTop: "5px",
                                    } }), SetNewValue: setenddatetime }), (0, jsx_runtime_1.jsx)(Top_Table_Element_1.default, { Data: 
                                //list all the unique values of the Protocol field
                                newrows.map((row) => row.Protocol).filter((value, index, self) => self.indexOf(value) === index), ElementName: "Protocol", Icon: (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, { style: {
                                        color: "#326591",
                                        fontSize: "23px",
                                        marginTop: "5px",
                                    } }), SetNewValue: setProtocolFilter }), (0, jsx_runtime_1.jsx)(Top_Table_Element_1.default, { Data: 
                                //list all the unique values of the Flags field inside the Packet array in the Stream object
                                newrows.map((row) => row.Packets.map((packet) => packet.flags)).flat().filter((value, index, self) => self.indexOf(value) === index), ElementName: "Flags", Icon: (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, { style: {
                                        color: "#326591",
                                        fontSize: "23px",
                                        marginTop: "5px",
                                    } }), SetNewValue: setFlagsFilter })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, item: true, xs: 4, style: {
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                        }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { style: {
                                color: "#304C57",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "normal",
                                marginTop: "-35px",
                                display: "flex",
                                flexDirection: "column", // This makes the content flow into two rows
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                margin: "auto",
                                opacity: isfiltervisible ? "1" : "0",
                            }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px", // Adds space between rows
                                    }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: "#304C57", fontWeight: "400", minWidth: "120px", flexGrow: 1 }, children: "Source IP" }), (0, jsx_runtime_1.jsx)(material_2.Checkbox, { defaultChecked: false, color: "primary", id: "source.ip", onChange: (e) => {
                                                if (e.target.checked) {
                                                    setChosenFields([...ChosenFields, "Source IP"]);
                                                }
                                                else {
                                                    setChosenFields(ChosenFields.filter((field) => field !== "Source IP"));
                                                }
                                            }, inputProps: { "aria-label": "secondary checkbox" } }), (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: "400", minWidth: "120px", flexGrow: 1, color: "#304C57", }, children: "Destination IP" }), (0, jsx_runtime_1.jsx)(material_2.Checkbox, { defaultChecked: false, color: "primary", id: "dest.ip", onChange: (e) => {
                                                if (e.target.checked) {
                                                    setChosenFields([...ChosenFields, "Destination IP"]);
                                                }
                                                else {
                                                    setChosenFields(ChosenFields.filter((field) => field !== "Destination IP"));
                                                }
                                            }, inputProps: { "aria-label": "secondary checkbox" } })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px", // Adds space between rows
                                    }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: "#304C57", fontWeight: "400", minWidth: "120px", flexGrow: 1 }, children: "Validity" }), (0, jsx_runtime_1.jsx)(material_2.Checkbox, { defaultChecked: false, color: "primary", id: "validity", onChange: (e) => {
                                                if (e.target.checked) {
                                                    setChosenFields([...ChosenFields, "Validity"]);
                                                }
                                                else {
                                                    setChosenFields(ChosenFields.filter((field) => field !== "Validity"));
                                                }
                                            }, inputProps: { "aria-label": "secondary checkbox" } }), (0, jsx_runtime_1.jsx)("span", { style: { color: "#304C57", fontWeight: "400", minWidth: "120px", flexGrow: 1 }, children: "Protocol" }), (0, jsx_runtime_1.jsx)(material_2.Checkbox, { defaultChecked: false, id: "protocol", onChange: (e) => {
                                                if (e.target.checked) {
                                                    setChosenFields([...ChosenFields, "Protocol"]);
                                                }
                                                else {
                                                    setChosenFields(ChosenFields.filter((field) => field !== "Protocol"));
                                                }
                                            }, color: "primary", inputProps: { "aria-label": "secondary checkbox" } })] })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, style: {
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }, children: (0, jsx_runtime_1.jsx)(material_1.Box, { style: {
                                color: "#304C57",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "normal",
                                height: "fit-content",
                                opacity: "0.6",
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                padding: "10px 15px",
                                borderRadius: "10px",
                                border: "1px solid rgba(48, 76, 87, 0.20)",
                                background: "#FFF",
                                boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.10)",
                            }, children: (0, jsx_runtime_1.jsxs)("div", { onClick: () => handleclearall(), style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    cursor: "pointer",
                                }, children: ["Clear All", (0, jsx_runtime_1.jsx)(HighlightOff_1.default, { style: {
                                            color: "#000000",
                                            fontSize: "23px",
                                        } })] }) }) })] }), (0, jsx_runtime_1.jsx)(Table_1.default, { rows: newrows, ProtocolFilter: ProtocolFilter, ValidityFilter: ValidityFilter, FlagsFilter: FlagsFilter, SourceIPFilter: SourceIPFilter, DestinationIPFilter: DestinationIPFilter, starttimedate: startdatetime, endtimedate: enddatetime })] }));
};
exports.default = Main_Comp;
