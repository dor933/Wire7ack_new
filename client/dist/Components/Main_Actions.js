"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const PlayArrow_1 = __importDefault(require("@mui/icons-material/PlayArrow"));
const Summarize_1 = __importDefault(require("@mui/icons-material/Summarize"));
const material_2 = require("@mui/material");
const axios_1 = __importDefault(require("axios"));
const Global_1 = require("./Context/Global");
const StopCircle_1 = __importDefault(require("@mui/icons-material/StopCircle"));
const Main_Actions = (props) => {
    const { chosenInterface, setChosenInterface } = (0, Global_1.useGlobal)();
    const { isCaptureStarted, setIsCaptureStarted } = (0, Global_1.useGlobal)();
    const handlestart = () => {
        axios_1.default.post('http://localhost:8000/api/start', {
            interfaceName: chosenInterface,
        })
            .then((response) => {
            console.log(response);
            setIsCaptureStarted(true);
        })
            .catch((error) => {
            console.log(error);
        });
    };
    const isxl = (0, material_2.useMediaQuery)('(min-width:1920px)');
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { onClick: props.ActionName === 'Start' ? () => handlestart() : () => handlestart(), container: true, item: true, xs: 4, xl: 3, style: {
            display: "flex",
            padding: "10px 15px",
            alignItems: "center",
            borderRadius: "10px",
            border: "1px solid rgba(48, 76, 87, 0.10)",
            cursor: "pointer",
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 2, style: {
                    display: "flex",
                    justifyContent: "flex-start",
                }, children: props.ActionName === "Start" && !isCaptureStarted ? (0, jsx_runtime_1.jsx)(PlayArrow_1.default, { style: {
                        color: "#326591",
                        fontSize: "23px",
                    } }) : props.ActionName === "Start" && isCaptureStarted ? (0, jsx_runtime_1.jsx)(StopCircle_1.default, { style: {
                        color: "#326591",
                        fontSize: "23px",
                    } }) :
                    props.ActionName === "Report" ? (0, jsx_runtime_1.jsx)(Summarize_1.default, { style: {
                            color: "#326591",
                            fontSize: "23px",
                        } }) : "" }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 10, style: {
                    color: "#326591",
                    fontFamily: "Roboto",
                    fontSize: isxl ? "16px" : "12px",
                    fontWeight: "600",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: '10px'
                }, children: props.ActionName === "Start" && !isCaptureStarted ? "Start Capture" : props.ActionName === "Start" && isCaptureStarted ? "Stop Capture" : props.ActionName === "Report" ? "Generate Report" : "" })] }));
};
exports.default = Main_Actions;
