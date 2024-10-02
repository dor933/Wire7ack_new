"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const Clear_1 = __importDefault(require("@mui/icons-material/Clear"));
const DateTimePicker_1 = require("@mui/x-date-pickers/DateTimePicker");
require("../PaginatedTable.css"); // Custom SCSS for table
const LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
const AdapterDayjs_1 = require("@mui/x-date-pickers/AdapterDayjs");
const Top_Table_Date = ({ ElementName, Icon, SetNewValue }) => {
    const [selectedDateTime, setSelectedDateTime] = (0, react_1.useState)(null);
    const [pickerOpen, setPickerOpen] = (0, react_1.useState)(false);
    const handleDateTimeChange = (newValue) => {
        if (newValue === null) {
            clearSelectedValue();
            return;
        }
        setSelectedDateTime(newValue);
        if (SetNewValue && newValue) {
            SetNewValue(newValue.toISOString());
        }
    };
    const clearSelectedValue = () => {
        setSelectedDateTime(null);
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, item: true, xs: 2, style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '10px',
        }, children: (0, jsx_runtime_1.jsx)(LocalizationProvider_1.LocalizationProvider, { dateAdapter: AdapterDayjs_1.AdapterDayjs, children: (0, jsx_runtime_1.jsx)(DateTimePicker_1.DateTimePicker, { sx: { border: '1px solid rgba(48, 76, 87, 0.20)',
                    background: '#FFF',
                    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.10)',
                    color: '#304C57',
                    fontFamily: 'Roboto',
                    borderRadius: '10px',
                    width: '100%',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    opacity: 0.6, }, slots: {
                    clearIcon: Clear_1.default,
                }, label: ElementName, open: pickerOpen, onOpen: () => setPickerOpen(true), onClose: () => setPickerOpen(false), value: selectedDateTime, format: 'DD-MM-YYYY HH:mm:ss', onChange: (newvalue) => {
                    console.log(newvalue);
                    if (!(newvalue instanceof Date)) {
                        return;
                    }
                    handleDateTimeChange(newvalue);
                } }) }) }));
};
exports.default = Top_Table_Date;
