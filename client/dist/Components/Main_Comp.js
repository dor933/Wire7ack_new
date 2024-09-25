"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../App.css");
const material_1 = require("@mui/material");
const FilterAlt_1 = __importDefault(require("@mui/icons-material/FilterAlt"));
const SearchBar_1 = __importDefault(require("./SearchBar"));
const Top_Table_Element_1 = __importDefault(require("./Top_Table_Element"));
//import calender icon
const CalendarToday_1 = __importDefault(require("@mui/icons-material/CalendarToday"));
const KeyboardArrowDown_1 = __importDefault(require("@mui/icons-material/KeyboardArrowDown"));
const HighlightOff_1 = __importDefault(require("@mui/icons-material/HighlightOff"));
const Table_1 = __importDefault(require("./Table"));
const Main_Comp = (props) => {
    const newrows = props.rows;
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
                        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { item: true, xs: 4, xl: 2, style: {
                                    display: "flex",
                                    padding: "10px 15px",
                                    alignItems: "center",
                                    gap: "10px",
                                    borderRadius: "10px",
                                    background: "rgba(64, 75, 137, 0.10)",
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
                                        }, children: "Add Filter" })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 4, children: (0, jsx_runtime_1.jsx)(SearchBar_1.default, { SearchType: "Search" }) })] })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 12, style: {
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
                        }, children: [(0, jsx_runtime_1.jsx)(Top_Table_Element_1.default, { Data: [], ElementName: "Date", Icon: (0, jsx_runtime_1.jsx)(CalendarToday_1.default, { style: {
                                        color: "#326591",
                                        fontSize: "23px",
                                        marginTop: "5px",
                                    } }) }), (0, jsx_runtime_1.jsx)(Top_Table_Element_1.default, { Data: 
                                //list all the unique values of the Protocol field
                                newrows.map((row) => row.Protocol).filter((value, index, self) => self.indexOf(value) === index), ElementName: "Protocol", Icon: (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, { style: {
                                        color: "#326591",
                                        fontSize: "23px",
                                        marginTop: "5px",
                                    } }) }), (0, jsx_runtime_1.jsx)(Top_Table_Element_1.default, { Data: 
                                //list all the unique values of the Flags field inside the Packet array in the Stream object
                                newrows.map((row) => row.Packets.map((packet) => packet.flags)).flat().filter((value, index, self) => self.indexOf(value) === index), ElementName: "Flags", Icon: (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, { style: {
                                        color: "#326591",
                                        fontSize: "23px",
                                        marginTop: "5px",
                                    } }) }), (0, jsx_runtime_1.jsx)(Top_Table_Element_1.default, { Data: [], ElementName: "Data Volume", Icon: (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, { style: {
                                        color: "#326591",
                                        fontSize: "23px",
                                        marginTop: "5px",
                                    } }) })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, item: true, xs: 4, style: {
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "flex-end",
                        }, children: (0, jsx_runtime_1.jsx)(material_1.Box, { style: {
                                color: "#304C57",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "normal",
                                opacity: "0.6",
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                padding: "10px 15px",
                                borderRadius: "10px",
                                border: "1px solid rgba(48, 76, 87, 0.20)",
                                background: "#FFF",
                                boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.10)",
                            }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }, children: ["Clear All", (0, jsx_runtime_1.jsx)(HighlightOff_1.default, { style: {
                                            color: "#000000",
                                            fontSize: "23px",
                                        } })] }) }) })] }), (0, jsx_runtime_1.jsx)(Table_1.default, { rows: newrows })] }));
};
exports.default = Main_Comp;