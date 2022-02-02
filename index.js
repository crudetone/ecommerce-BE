const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");

dontenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull"))
  .catch((error) => console.log("error: ", error));

app.use(express.json());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
