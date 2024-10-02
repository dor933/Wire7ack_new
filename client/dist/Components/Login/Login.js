"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const Login = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        // Navigate to the main page if the user is authenticated
        if (isAuthenticated) {
            console.log('User is authenticated');
            navigate('/'); // Imperatively navigate to the main page
        }
    }, [isAuthenticated, navigate]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, style: {
                display: 'flex',
                width: '95%',
                padding: '10px 30px',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(48, 76, 87, 0.10)',
                background: '#F7FBFC',
                margin: '0 auto',
            }, children: (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, item: true, xs: 6, style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                }, children: (0, jsx_runtime_1.jsx)("h1", { children: "Login" }) }) }) }));
};
exports.default = Login;
