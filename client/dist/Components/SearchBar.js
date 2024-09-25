"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const InputBase_1 = __importDefault(require("@mui/material/InputBase"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
function SearchBar(props) {
    return ((0, jsx_runtime_1.jsxs)(Paper_1.default, { component: "form", sx: { p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }, children: [(0, jsx_runtime_1.jsx)(InputBase_1.default, { sx: { ml: 1, flex: 1 }, placeholder: props.SearchType === 'Quick Action' ? "Quick Action" : props.SearchType === 'Search' ? "Search For Connection" : "", inputProps: { 'aria-label': 'search google maps' } }), (0, jsx_runtime_1.jsx)(IconButton_1.default, { type: "button", sx: { p: '10px' }, "aria-label": "search", children: (0, jsx_runtime_1.jsx)(Search_1.default, {}) })] }));
}
exports.default = SearchBar;
