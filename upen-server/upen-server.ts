import express = require('express');
import bodyParser = require("body-parser");

import { routes } from './routes';

var upenServer = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

upenServer.use(allowCrossDomain);
upenServer.use(bodyParser.json());
var server = upenServer.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

function closeServer(): void{
  server.close();
}

upenServer.use(routes);
export { server, closeServer }