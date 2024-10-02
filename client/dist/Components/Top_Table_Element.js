"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const KeyboardArrowDown_1 = __importDefault(require("@mui/icons-material/KeyboardArrowDown"));
const KeyboardArrowRight_1 = __importDefault(require("@mui/icons-material/KeyboardArrowRight"));
require("../PaginatedTable.css"); // Custom SCSS for table
const Clear_1 = __importDefault(require("@mui/icons-material/Clear"));
const Top_Table_Element = ({ ElementName, Icon, Data, SetNewValue }) => {
    const [open, setOpen] = (0, react_1.useState)(false); // State to manage the collapse
    const [selectedValue, setSelectedValue] = (0, react_1.useState)(null);
    const handleClick = () => {
        setOpen(!open); // Toggle the open state
    };
    const clearSelectedValue = () => {
        setSelectedValue(null);
        if (SetNewValue) {
            SetNewValue('');
        }
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 2, style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingBottom: '3.5px',
            borderRadius: '10px',
            border: '1px solid rgba(48, 76, 87, 0.20)',
            background: '#FFF',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.10)',
        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 12, style: {}, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 8, style: {
                            color: '#304C57',
                            fontFamily: 'Roboto',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            display: 'flex',
                            alignItems: 'center',
                            opacity: 0.6,
                        }, children: selectedValue ? selectedValue : ElementName }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 4, style: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(material_1.List, { sx: { width: '100%', bgcolor: 'background.paper' }, component: "div", "aria-labelledby": "nested-list-subheader", children: !selectedValue ?
                                (0, jsx_runtime_1.jsx)(material_1.ListItemButton, { onClick: handleClick, sx: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '0px',
                                        minHeight: '36px', // Keep the height fixed
                                    }, children: open ? (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, {}) : (0, jsx_runtime_1.jsx)(KeyboardArrowRight_1.default, {}) }) : (0, jsx_runtime_1.jsx)(material_1.ListItemButton, { onClick: () => clearSelectedValue(), sx: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '0px',
                                    minHeight: '36px', // Keep the height fixed
                                }, children: (0, jsx_runtime_1.jsx)(Clear_1.default, {}) }) }) })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, style: { width: '100%' }, children: (0, jsx_runtime_1.jsx)(material_1.Collapse, { in: open, timeout: "auto", unmountOnExit: true, children: (0, jsx_runtime_1.jsx)(material_1.List, { component: "div", disablePadding: true, children: Data.map((item, index) => ((0, jsx_runtime_1.jsx)(material_1.ListItemButton, { onClick: () => {
                                if (SetNewValue) {
                                    SetNewValue(item);
                                    setSelectedValue(item);
                                    setOpen(false);
                                }
                            }, children: (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: item }) }, index))) }) }) })] }));
};
exports.default = Top_Table_Element;
