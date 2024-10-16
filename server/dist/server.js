"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const start_1 = __importDefault(require("./routes/start"));
const stop_1 = __importDefault(require("./routes/stop"));
const preconfig_1 = __importDefault(require("./routes/preconfig"));
const cors_1 = __importDefault(require("cors"));
const websocket_server_1 = require("./websocket_server");
const maintainance_1 = __importDefault(require("./routes/maintainance"));
const wsServer = (0, websocket_server_1.startWebSocketServer)();
exports.wsServer = wsServer;
//import cors
const capturedirectory = path_1.default.join(__dirname, './captures');
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
app.use('/api', start_1.default);
app.use('/api', stop_1.default);
app.use('/api', preconfig_1.default);
app.use('/api', maintainance_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
