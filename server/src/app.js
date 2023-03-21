const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set cookie"],
  })
);

// configuring the database
const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");

// connecting to the database
mongoose
  .connect(dbConfig.localURL, {
    useNewURLParser: true,
  })
  .then(() => {
    console.log("Successfully connect to the database!");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...\n", err);
    process.exit();
  });

// import routes
const communityRoutes = require("./app/routes/new-community.routes");
const LoginRegisterRoutes = require("./app/routes/user.routes");

// using routes
app.use("/community", communityRoutes);
app.use("/api/", LoginRegisterRoutes);

// error handling
app.use((req, res, next) => {
  const error = new Error("404 Not Found");
  res.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status = error.status || 404;
  res.json({
    error: error.message,
  });
});

module.exports = app;
