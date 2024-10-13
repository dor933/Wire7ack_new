"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Functions_1 = require("../Functions");
const Functions_2 = require("../Functions");
const router = (0, express_1.Router)();
router.get('/preconfig/interfaces', async (req, res) => {
    try {
        const result = await (0, Functions_1.getTsharkInterfaces)();
        const ipv4Address = (0, Functions_2.getipv4address)();
        res.send({ interfaces: result, ipv4Address });
    }
    catch (error) {
        console.error('Error getting interfaces:', error);
        res.status(500).send('Failed to get interfaces');
    }
});
exports.default = router;
