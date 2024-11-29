"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Functions_1 = require("../Functions");
const Functions_2 = require("../Functions");
const logger_1 = __importDefault(require("../logger"));
const router = (0, express_1.Router)();
router.get('/preconfig/interfaces', async (req, res) => {
    try {
        const result = await (0, Functions_1.getTsharkInterfaces)();
        const ipv4Address = (0, Functions_2.getipv4address)();
        res.send({ interfaces: result, ipv4Address });
        logger_1.default.info('Interfaces and IPv4 address fetched:', { Component: 'Preconfig' }, { interfaces: result, ipv4Address });
    }
    catch (error) {
        logger_1.default.error('Error getting interfaces:', { Component: 'Preconfig' }, { error: error });
        res.status(500).send('Failed to get interfaces');
    }
});
exports.default = router;
