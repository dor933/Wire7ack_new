"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../main");
const router = (0, express_1.Router)();
router.get('/maintainance/iscapture', async (req, res) => {
    try {
        if (main_1.iscapturing) {
            res.send({ iscapturing: true });
        }
        else {
            res.send({ iscapturing: false });
        }
    }
    catch (error) {
        res.status(500).send('Failed to get capture status');
    }
});
exports.default = router;
