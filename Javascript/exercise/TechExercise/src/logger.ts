/*
 * Logger Module
 */

import winston from 'winston';
import config from './configuration/config.json';

export const logger = winston.createLogger({
 // format:winston.format.combine(
    // winston.format.colorize(),
    // winston.format.json(),
   // winston.format.label({ label: config.loggingLabel }),
    // winston.format.timestamp()
  // ),
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()),
  transports: [
    new (winston.transports.Console)({
      level: config.loggingLevel,
    }),
    new (winston.transports.File)({
      level: config.loggingLevel,
      filename: config.loggingPath,
      handleExceptions: false,
      maxsize: config.loggingMaxSizeFile, // 5MB
      maxFiles: config.loggingMaxFiles,
    })
  ],
  exitOnError: false
});
