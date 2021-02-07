import express from "express";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());

// define a route handler for the default home page
// app.get( "/", ( req, res ) => {
//     res.send( "Hello world!" );
// } );

app.get('/health-check', (req, res, next) => {
  res.send(200);
  return next();
});

import {routes} from './routes';
const expressRoutes = routes(app);
export default app;