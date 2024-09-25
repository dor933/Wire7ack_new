"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../App.css");
const material_1 = require("@mui/material");
//import Logo image 
const SearchBar_1 = __importDefault(require("./SearchBar"));
const Person_1 = __importDefault(require("@mui/icons-material/Person"));
const Logo_png_1 = __importDefault(require("../assets/Logo.png"));
const Header = () => {
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, style: { display: "flex",
            width: "100%",
            padding: "10px 30px",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: '-30px',
        }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 6, style: { display: "flex", alignItems: "center",
                }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 3, style: {}, children: (0, jsx_runtime_1.jsx)(material_1.Box, { style: { fontSize: "20px", fontWeight: "bold" }, children: (0, jsx_runtime_1.jsx)("img", { src: Logo_png_1.default, alt: "Logo", style: { height: "180px",
                                } }) }) }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 3, style: { display: "flex",
                            justifyContent: "space-between",
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 2, style: {
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: (0, jsx_runtime_1.jsxs)("g", { opacity: "0.8", children: [(0, jsx_runtime_1.jsx)("path", { d: "M19 8.71001L13.667 4.56201C13.199 4.19792 12.623 4.00024 12.03 4.00024C11.4371 4.00024 10.861 4.19792 10.393 4.56201L5.05903 8.71001C4.73875 8.95955 4.4796 9.27885 4.30129 9.64361C4.12298 10.0084 4.03021 10.409 4.03003 10.815V18.015C4.03003 18.5454 4.24074 19.0542 4.61582 19.4292C4.99089 19.8043 5.4996 20.015 6.03003 20.015H18.03C18.5605 20.015 19.0692 19.8043 19.4442 19.4292C19.8193 19.0542 20.03 18.5454 20.03 18.015V10.815C20.03 9.99201 19.65 9.21501 19 8.71001Z", stroke: "#304C57", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M16 15C13.79 16.333 10.208 16.333 8 15", stroke: "#304C57", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })] }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 10, style: {
                                    display: "flex",
                                    justifyContent: 'flex-start',
                                    alignItems: "center",
                                    fontFamily: "Roboto",
                                    color: "#304C57",
                                    paddingLeft: "10px",
                                    paddingTop: "5px",
                                }, children: "Home" })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 3, style: { display: "flex",
                            justifyContent: "space-between",
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 2, style: {
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: (0, jsx_runtime_1.jsx)("g", { opacity: "0.8", children: (0, jsx_runtime_1.jsx)("path", { d: "M3 17L12 22L21 17V14L12 19L3 14V11L12 16L21 11V8L12 13L3 8L12 3L17.418 6.01", stroke: "#304C57", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }) }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 10, style: {
                                    display: "flex",
                                    justifyContent: 'flex-start',
                                    alignItems: "center",
                                    paddingLeft: "10px",
                                    fontFamily: "Roboto",
                                    color: "#304C57",
                                    paddingTop: "5px",
                                }, children: "Layers" })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 3, style: { display: "flex",
                            justifyContent: "space-between",
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 2, style: {
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M5 4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5V11C10 11.2652 9.89464 11.5196 9.70711 11.7071C9.51957 11.8946 9.26522 12 9 12H5C4.73478 12 4.48043 11.8946 4.29289 11.7071C4.10536 11.5196 4 11.2652 4 11V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4ZM5 16H9C9.26522 16 9.51957 16.1054 9.70711 16.2929C9.89464 16.4804 10 16.7348 10 17V19C10 19.2652 9.89464 19.5196 9.70711 19.7071C9.51957 19.8946 9.26522 20 9 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V17C4 16.7348 4.10536 16.4804 4.29289 16.2929C4.48043 16.1054 4.73478 16 5 16ZM15 12H19C19.2652 12 19.5196 12.1054 19.7071 12.2929C19.8946 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H15C14.7348 20 14.4804 19.8946 14.2929 19.7071C14.1054 19.5196 14 19.2652 14 19V13C14 12.7348 14.1054 12.4804 14.2929 12.2929C14.4804 12.1054 14.7348 12 15 12ZM15 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8H15C14.7348 8 14.4804 7.89464 14.2929 7.70711C14.1054 7.51957 14 7.26522 14 7V5C14 4.73478 14.1054 4.48043 14.2929 4.29289C14.4804 4.10536 14.7348 4 15 4Z", stroke: "#304C57", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 10, style: {
                                    display: "flex",
                                    justifyContent: 'flex-start',
                                    alignItems: "center",
                                    paddingLeft: "10px",
                                    paddingTop: "5px",
                                    fontFamily: "Roboto",
                                    color: "#304C57",
                                }, children: "Inventory" })] })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 6, style: { display: "flex", alignItems: "center",
                }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 6, style: {
                            display: "flex",
                            justifyContent: "flex-end",
                        }, children: (0, jsx_runtime_1.jsx)(SearchBar_1.default, { SearchType: "Quick Action" }) }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 6, style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            justifyContent: "center",
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 2, xl: 1, style: {
                                    display: "flex",
                                    padding: "5px 10px",
                                    alignItems: "center",
                                    border: "1px solid rgba(48, 76, 87, 0.20)",
                                    borderRadius: "10px",
                                }, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: (0, jsx_runtime_1.jsxs)("g", { opacity: "0.8", children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 17V17.01M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z", stroke: "#304C57", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 13.5C11.9816 13.1754 12.0692 12.8536 12.2495 12.583C12.4299 12.3125 12.6933 12.1079 13 12C13.3759 11.8563 13.7132 11.6272 13.9856 11.331C14.2579 11.0347 14.4577 10.6792 14.5693 10.2926C14.6809 9.90597 14.7013 9.49871 14.6287 9.10288C14.5562 8.70705 14.3928 8.33346 14.1513 8.01153C13.9099 7.68959 13.597 7.4281 13.2373 7.24763C12.8776 7.06716 12.4809 6.97265 12.0785 6.97154C11.6761 6.97042 11.2789 7.06273 10.9182 7.2412C10.5576 7.41967 10.2432 7.67942 10 8.00001", stroke: "#304C57", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })] }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 2, xl: 1, style: {
                                    display: "flex",
                                    padding: "5px 10px",
                                    alignItems: "center",
                                    border: "1px solid rgba(48, 76, 87, 0.20)",
                                    borderRadius: "10px",
                                }, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: (0, jsx_runtime_1.jsx)("g", { opacity: "0.8", children: (0, jsx_runtime_1.jsx)("path", { d: "M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17M10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C15.1484 5.54303 16.1274 6.38833 16.8321 7.4453C17.5367 8.50227 17.9404 9.73107 18 11V14C18.0753 14.6217 18.2954 15.2171 18.6428 15.7381C18.9902 16.2592 19.4551 16.6914 20 17H4C4.54494 16.6914 5.00981 16.2592 5.35719 15.7381C5.70457 15.2171 5.92474 14.6217 6 14V11C6.05956 9.73107 6.4633 8.50227 7.16795 7.4453C7.8726 6.38833 8.85159 5.54303 10 5Z", stroke: "#304C57", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }) }) }) }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, xs: 4, style: {
                                    display: "flex",
                                    padding: "5px 10px",
                                    alignItems: "center",
                                    border: "1px solid rgba(48, 76, 87, 0.20)",
                                    borderRadius: "10px",
                                }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 9, style: {
                                            color: "#304C57",
                                            fontFamily: "Roboto",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: "500",
                                            lineHeight: "normal",
                                            opacity: "0.8",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }, children: "Dor Ratzabi" }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 3, style: {
                                            width: "24px",
                                            height: "24px",
                                        }, children: (0, jsx_runtime_1.jsx)(Person_1.default, { style: {
                                                color: "#304C57",
                                                fontSize: "24px",
                                            } }) })] })] })] })] }));
};
exports.default = Header;
