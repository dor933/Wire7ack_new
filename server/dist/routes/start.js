"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../main");
const router = (0, express_1.Router)();
router.post('/start', (req, res) => {
    try {
        const { interfaceName } = req.body;
        const result = (0, main_1.startMainProcess)(interfaceName);
        res.send(result);
    }
    catch (error) {
        console.error('Error starting the main process:', error);
        res.status(500).send('Failed to start the main process');
    }
});
exports.default = router;
