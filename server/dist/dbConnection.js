"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConnection = getDbConnection;
const mssql_1 = __importDefault(require("mssql"));
//צריך לוודא שה instance מאזין בפורט 1433 ופתוח לתקשורת ב TCP
const config = {
    user: 'sa',
    password: '90209020aA1!!',
    server: 'localhost',
    port: 1433, // You can use 'localhost\\instance' to connect to named instance
    database: 'Wire7ack',
    options: {
        encrypt: false, // For Azure SQL Database
        trustServerCertificate: true // For local development
    }
};
async function getDbConnection() {
    try {
        const pool = await mssql_1.default.connect(config);
        return pool;
    }
    catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}
