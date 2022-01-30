const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dontenv = require("dotenv");

dontenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull"))
  .catch((error) => console.log("error: ", error));

app.listen(5000, () => {
  console.log("Backend server is running");
});
