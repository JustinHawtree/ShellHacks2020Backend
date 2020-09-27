"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

import { eventRouter } from "./controllers/event.controller";
import { areaRouter } from "./controllers/area.controller";
import { taskRouter } from "./controllers/task.controller";


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use("/event", eventRouter);
app.use("/area", areaRouter);
app.use("/task", taskRouter);

app.listen(PORT, (err: any) => {
  if (err) {
    console.log("Server Error", err)
  } else {
    console.log(`Listening on Port ${PORT}`);
  }
})

