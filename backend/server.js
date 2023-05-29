require("dotenv").config();

const express = require("express");
// mongoose is an Object Data Modeling (ODM) library for node.js and mongodb.
// for more intuitive interface when interacting with mongodb databases.
// allows for schemas for data and provides features for data validation, query building and middelware support.
// mongoose can help prevent errors and ensure data integrity by enforcing validation rules defined in the schema.
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");
const auctionRoutes = require("./routes/auctions");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  // log every request
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auctions", auctionRoutes);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
