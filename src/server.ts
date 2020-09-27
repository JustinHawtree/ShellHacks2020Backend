"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = process.env.PORT || 3001;

import { eventRouter } from "./controllers/event.controller";
import { areaRouter } from "./controllers/area.controller";
import { taskRouter } from "./controllers/task.controller";


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001']
}))


app.use("/event", eventRouter);
app.use("/area", areaRouter);
app.use("/task", taskRouter);

app.listen(PORT, (err: any) => {
  if (err) {
    console.log("Server Error", err)
  } else {
    console.log(`Listening on Port ${PORT}`);
  }
});



require('uWebSockets.js').App().ws('/*', {
  // Websocket Settings
  idleTimeout: 30,
  maxBackpressure: 1024,
  maxPayloadLength: 512,
  compression: 0,

  open: (ws: any, req: any) => {
    console.log("Req", req);
    console.log("A Websocket connected!");
  },

  // Remove a task?

  // Create a new area
  // Create a new task
  // Complete a task
  // Join a task
  // Leave a task

  /* For brevity we skip the other events (upgrade, open, ping, pong, close) */
  message: (ws: any, message: any, isBinary: any) => {
    /* You can do app.publish('sensors/home/temperature', '22C') kind of pub/sub as well */
    
    /* Here we echo the message back, using compression if available */
    let ok = ws.send(message, isBinary, true);
  },

  close: (ws: any, code: any, message: any) => {
    console.log("WebSocket Closed");
  }
  
}).listen(3002, (listenSocket: any) => {

  if (listenSocket) {
    console.log('WebSocket Server Listening to port 3002');
  }
  
});

