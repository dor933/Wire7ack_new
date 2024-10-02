"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
const Main_1 = __importDefault(require("./Components/Main"));
const Global_1 = require("./Components/Context/Global");
const react_router_dom_1 = require("react-router-dom");
const Login_1 = __importDefault(require("./Components/Login/Login"));
const react_1 = require("react");
const react_2 = require("react");
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = (0, react_1.useState)(false);
    const [isOnline, setIsOnline] = (0, react_1.useState)(navigator.onLine);
    (0, react_2.useEffect)(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        // Cleanup listeners on component unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)(Global_1.GlobalProvider, { children: (0, jsx_runtime_1.jsx)("div", { className: "App", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, { isAuthenticated: isAuthenticated, setIsAuthenticated: setIsAuthenticated }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/main", element: (0, jsx_runtime_1.jsx)(Main_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/main" }) })] }) }) }) }));
};
exports.default = App;
