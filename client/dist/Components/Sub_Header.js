"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../App.css");
const react_1 = require("react");
const material_1 = require("@mui/material");
const Packets_Views_1 = __importDefault(require("./Packets_Views"));
const Main_Actions_1 = __importDefault(require("./Main_Actions"));
const Info_1 = __importDefault(require("@mui/icons-material/Info"));
const Sub_Header = () => {
    const [View, setView] = (0, react_1.useState)("All Connections");
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, style: {
                    display: "flex",
                    width: "95%",
                    padding: "10px 30px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(48, 76, 87, 0.10)",
                    background: "#F7FBFC",
                    margin: "0 auto",
                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 6, style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }, children: [(0, jsx_runtime_1.jsx)(Packets_Views_1.default, { SetChosenView: setView, ChosenView: View, ViewName: "All Connections" }), (0, jsx_runtime_1.jsx)(Packets_Views_1.default, { SetChosenView: setView, ChosenView: View, ViewName: "Error Connections" }), (0, jsx_runtime_1.jsx)(Packets_Views_1.default, { SetChosenView: setView, ChosenView: View, ViewName: "Warning Connections" })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 6, style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            justifyContent: "flex-end",
                        }, children: [(0, jsx_runtime_1.jsx)(Main_Actions_1.default, { ActionName: "Start" }), (0, jsx_runtime_1.jsx)(Main_Actions_1.default, { ActionName: "Report" }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 1, style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }, children: (0, jsx_runtime_1.jsx)(Info_1.default, { style: {
                                        color: "#326591",
                                        fontSize: "23px",
                                        marginTop: "5px",
                                    } }) })] })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, style: {
                    display: "flex",
                    width: "95%",
                    padding: "10px 30px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "0 auto",
                } })] }));
};
exports.default = Sub_Header;
