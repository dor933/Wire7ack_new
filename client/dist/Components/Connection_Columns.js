"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Column_1 = __importDefault(require("./Column"));
const Connection_Columns = () => {
    const columns = ["ID", "Source IP", "Destination IP", "Source Port", "Destination Port", "Protocol", "Status", "Timestamp", "Action", "DataVolume", "Application Protocol"];
    return ((0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, item: true, xs: 12, style: {
            display: "flex",
            padding: "15px 20px",
            alignItems: "center",
            gap: "10px",
            alignSelf: "stretch",
            borderRadius: "10px 10px 0px 0px",
            background: "#F7FBFC",
        }, children: columns.map((column, index) => {
            return (0, jsx_runtime_1.jsx)(Column_1.default, { ColumnName: column }, index);
        }) }));
};
exports.default = Connection_Columns;
