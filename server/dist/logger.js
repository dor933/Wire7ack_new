"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const Transport = __importStar(require("winston-elasticsearch"));
function mapLogLevel(winstonLevel) {
    const levelMap = {
        error: 'Error',
        warn: 'Warning',
        info: 'Information',
        debug: 'Debug',
        verbose: 'Debug',
        silly: 'Debug'
    };
    return levelMap[winstonLevel] || 'Information';
}
const esTransport = new Transport.ElasticsearchTransport({
    level: 'info',
    clientOpts: {
        node: 'http://localhost:9200'
    },
    index: 'logs-wire7ack', // Specify exact index name
    indexPrefix: 'logs-wire7ack',
    indexTemplate: {
        name: 'wire7ack-logs-template',
        body: {
            index_patterns: ['logs-wire7ack'], // Match exact index name
            template: {
                settings: {
                    number_of_shards: 1,
                    number_of_replicas: 0,
                    index: {
                        refresh_interval: '5s'
                    }
                },
                mappings: {
                    dynamic: true,
                    properties: {
                        '@timestamp': { type: 'date' },
                        'level': { type: 'keyword' },
                        'message': { type: 'text' },
                        'Component': { type: 'keyword' },
                        'Environment': { type: 'keyword' }
                    }
                }
            }
        }
    },
    dataStream: false,
    transformer: (logData) => {
        var _a, _b;
        return ({
            ...logData,
            '@timestamp': new Date().toISOString(),
            fields: {
                Component: ((_a = logData.meta) === null || _a === void 0 ? void 0 : _a.Component) || 'default-component',
                Environment: ((_b = logData.meta) === null || _b === void 0 ? void 0 : _b.Environment) || 'Production',
            },
            level: mapLogLevel(logData.level), // Map the log level here
        });
    }
});
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    defaultMeta: { environment: 'Production' },
    transports: [
        new winston_1.transports.Console(),
        esTransport
    ]
});
esTransport.on('error', (error) => {
    console.error('Elasticsearch Transport Error:', error);
});
exports.default = logger;
