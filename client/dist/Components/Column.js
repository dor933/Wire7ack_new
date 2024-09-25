"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ImportExport_1 = __importDefault(require("@mui/icons-material/ImportExport"));
const Column = (props) => {
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 1, style: {
            color: "#304C57",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: "normal",
            opacity: "0.7",
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 8, children: props.ColumnName }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 4, children: (0, jsx_runtime_1.jsx)(ImportExport_1.default, { style: {
                        color: "#304C57",
                        fontSize: "16px",
                    } }) })] }));
};
exports.default = Column;
