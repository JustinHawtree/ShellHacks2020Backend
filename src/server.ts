"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

import { eventRouter } from "./controllers/event.controller";



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use("/event", eventRouter);

app.listen(PORT, (err: any) => {
  if (err) {
    console.log("Server Error", err)
  } else {
    console.log(`Listening on Port ${PORT}`);
  }
})

