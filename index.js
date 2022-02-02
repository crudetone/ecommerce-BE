const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");

dontenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull"))
  .catch((error) => console.log("error: ", error));

app.use(express.json());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/carts', cartRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
