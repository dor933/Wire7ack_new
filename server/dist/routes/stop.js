"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_watcher_1 = require("../file_watcher");
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const capturedirectory = path_1.default.join(__dirname, '.././captures');
const router = (0, express_1.Router)();
router.get('/stop', (req, res) => {
    try {
        const result = (0, file_watcher_1.stopFileWatcher)(() => {
            console.log('File watcher stopped. Processing remaining files...');
        }, capturedirectory);
        res.send(result);
    }
    catch (error) {
        console.error('Error stopping the main process:', error);
        res.status(500).send('Failed to stop the main process');
    }
});
exports.default = router;
