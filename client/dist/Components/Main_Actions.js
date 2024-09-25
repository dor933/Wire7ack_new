"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const PlayArrow_1 = __importDefault(require("@mui/icons-material/PlayArrow"));
const Summarize_1 = __importDefault(require("@mui/icons-material/Summarize"));
const Main_Actions = (props) => {
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 3, style: {
            display: "flex",
            padding: "10px 15px",
            alignItems: "center",
            borderRadius: "10px",
            border: "1px solid rgba(48, 76, 87, 0.10)",
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 2, children: props.ActionName === "Start" ? (0, jsx_runtime_1.jsx)(PlayArrow_1.default, { style: {
                        color: "#326591",
                        fontSize: "23px",
                        marginTop: "5px",
                    } }) : props.ActionName === "Report" ? (0, jsx_runtime_1.jsx)(Summarize_1.default, { style: {
                        color: "#326591",
                        fontSize: "23px",
                        marginTop: "5px",
                    } }) : "" }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 10, style: {
                    color: "#326591",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: "600",
                    fontStyle: "normal",
                    lineHeight: "normal",
                }, children: props.ActionName === "Start" ? "Start Capture" : props.ActionName === "Report" ? "Generate Report" : "" })] }));
};
exports.default = Main_Actions;
