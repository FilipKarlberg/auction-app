require("dotenv").config();

const express = require("express");

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  // log every request
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ mssg: "welcome" });
});

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
