"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../App.css");
const material_1 = require("@mui/material");
const Packet_Views = (props) => {
    const getBorderColor = () => {
        return props.ViewName === 'All Connections'
            ? "rgba(64, 75, 137, 0.10)"
            : props.ViewName === 'Error Connections'
                ? "rgba(137, 64, 75, 0.10)"
                : props.ViewName === 'Warning Connections'
                    ? "rgba(255, 165, 0, 0.10)" // Example for Warning Connections
                    : '';
    };
    const getBackgroundColor = () => {
        return props.ViewName === 'All Connections'
            ? "rgba(64, 75, 137, 0.10)"
            : props.ViewName === 'Error Connections'
                ? "rgba(137, 64, 75, 0.10)"
                : props.ViewName === 'Warning Connections'
                    ? "rgba(255, 165, 0, 0.10)" // Example for Warning Connections
                    : '';
    };
    const getFillColor = () => {
        return props.ViewName === 'All Connections'
            ? "#326591"
            : props.ViewName === 'Error Connections'
                ? "#913250"
                : props.ViewName === 'Warning Connections'
                    ? "#FFA500" // Example for Warning Connections
                    : '';
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 4, lg: 3, style: {
            display: "flex",
            padding: "10px 15px",
            cursor: "pointer",
            alignItems: "center",
            borderRadius: "10px",
            border: `1px solid ${getBorderColor()}`,
            background: getBackgroundColor(),
            boxShadow: props.ChosenView === props.ViewName ? "10px 10px 10px 10px rgba(0, 0, 0, 0.10)" : "",
            opacity: props.ChosenView === props.ViewName ? 1 : 0.5,
        }, onClick: () => props.SetChosenView(props.ViewName), children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 2, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "7", height: "12", viewBox: "0 0 7 8", fill: "none", children: (0, jsx_runtime_1.jsx)("circle", { cx: "3.5", cy: "4", r: "3.5", fill: getFillColor() }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 10, style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "normal",
                    color: getFillColor(),
                    fontFamily: "Roboto",
                    display: "flex",
                    alignItems: "center",
                    opacity: props.ViewName === 'All Connections' ? 1 : 0.8,
                }, children: props.ViewName })] }));
};
exports.default = Packet_Views;
