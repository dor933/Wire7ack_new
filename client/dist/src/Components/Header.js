"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
const material_1 = require("@mui/material");
const Header = () => {
    return ((0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, style: { display: "flex",
            width: "100%",
            padding: "10px 30px",
            justifyContent: "space-between",
            alignItems: "center",
        }, children: (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, item: true, xs: 4, style: { display: "flex", alignItems: "center", gap: "30px" }, children: (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 3, children: (0, jsx_runtime_1.jsx)(material_1.Box, { style: { fontSize: "20px", fontWeight: "bold" }, children: "Home" }) }) }) }));
};
exports.default = Header;
