import { createLogger, transports, format } from 'winston';
import * as Transport from 'winston-elasticsearch';

function mapLogLevel(winstonLevel: string): string {
  const levelMap: { [key: string]: string } = {
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
  transformer: (logData: any) => ({
    ...logData,
    '@timestamp': new Date().toISOString(),
    fields: {
      Component : logData.meta?.Component || 'default-component',
      Environment : logData.meta?.Environment || 'Production',
    },
    level: mapLogLevel(logData.level), // Map the log level here

  })
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  defaultMeta: { environment: 'Production' },
  transports: [
    new transports.Console(),
    esTransport
  ]
});

esTransport.on('error', (error) => {
  console.error('Elasticsearch Transport Error:', error);
});

export default logger;