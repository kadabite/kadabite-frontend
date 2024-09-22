import winston, { Logger } from 'winston';
import { TransformableInfo } from 'logform';


// Define the logger
export const myLogger: Logger = (() => {
  if (process.env.NODE_ENV === 'test') {
    return winston.createLogger({
      transports: [
        new winston.transports.Console({
          silent: true,
        }),
      ],
    });
  }

  const transports: winston.transport[] = [
    new winston.transports.Console(), // Always log to console for both server and client
  ];

  // Dynamically import file transport if running on the server
  if (typeof window === 'undefined') {
    const { File } = require('winston').transports;

    transports.push(
      new File({ filename: 'logs/request.log', level: 'info' }),
      new File({ filename: 'logs/error.log', level: 'error' })
    );
  }

  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.printf((info: TransformableInfo) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports,
  });
})();