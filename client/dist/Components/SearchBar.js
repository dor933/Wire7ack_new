"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const InputBase_1 = __importDefault(require("@mui/material/InputBase"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
function SearchBar(props) {
    const [MyFields, setMyFields] = React.useState(props.Fields);
    React.useEffect(() => {
        setMyFields(props.Fields);
    }, [props.Fields]);
    return ((0, jsx_runtime_1.jsxs)(Paper_1.default, { component: "form", sx: { p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }, children: [(0, jsx_runtime_1.jsx)(InputBase_1.default, { sx: { ml: 1, flex: 1 }, placeholder: props.SearchType === 'Quick Action' ? "Quick Action" : props.SearchType === 'Search' ? "Search For Connection" : "", inputProps: { 'aria-label': 'search google maps' }, value: MyFields.map((field, index) => (field + ":" + " ")) }), (0, jsx_runtime_1.jsx)(IconButton_1.default, { type: "button", sx: { p: '10px' }, "aria-label": "search", children: (0, jsx_runtime_1.jsx)(Search_1.default, {}) })] }));
}
exports.default = SearchBar;
