import app from './app';
import dotenv from "dotenv";

import {logger} from './logger';
import * as config from './configuration/config.json';
// initialize configuration
dotenv.config();
// port is now available to the Node.js runtime
// as if it were an environment variable
const port = config.port;
// start the Express server
app.listen( port, () => {
    logger.info(`server started at http://localhost:${ port }`);
} ).
on('clientError', (err, socket) => {
  logger.error('[Server] Client sent event Error (Client error): ', err);
  // socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
}).
on('close', () => {
  logger.info('[Server] Server stopping......)');
}).
on('request', (req, res) => {
  res.on('finish', () => {
    req.socket.destroy();
  });
}).
on('uncaughtException', (request, response, route, error, cb) =>{
  logger.error('[Server] Internal error (uncaughtException)',
    {error: error.stack});
  // Policy for uncaughtExceptions. Exit inmediately.
  // process.exit(1);
});