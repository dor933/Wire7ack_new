"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalProvider = exports.useGlobal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const GlobalContext = (0, react_1.createContext)(undefined);
const useGlobal = () => {
    const context = (0, react_1.useContext)(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};
exports.useGlobal = useGlobal;
const GlobalProvider = ({ children }) => {
    const [isCaptureStarted, setIsCaptureStarted] = (0, react_1.useState)(false);
    const [isConnectionopen, setIsConnectionopen] = (0, react_1.useState)(false);
    const [chosenInterface, setChosenInterface] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsx)(GlobalContext.Provider, { value: { isCaptureStarted, chosenInterface, setChosenInterface, setIsCaptureStarted, isConnectionopen, setIsConnectionopen }, children: children }));
};
exports.GlobalProvider = GlobalProvider;
