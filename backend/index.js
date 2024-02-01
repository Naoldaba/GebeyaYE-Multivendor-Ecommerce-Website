const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const product = require("./routes/Product");
const user = require("./routes/user");
const auth = require("./routes/auth");
const cart = require("./routes/Cart");
const order = require("./routes/Order");
const advert = require("./routes/advertisment");
const message = require("./routes/message");
const payment = require("./routes/payment");

// const mongoURL ="mongodb+srv://eyobderese:jobman2008@cluster0.32apy9n.mongodb.net/?retryWrites=true&w=majority";
const mongoURL = "mongodb://0.0.0.0:27017/gebeyaye";
// const mongoURL = "mongodb://0.0.0.0:27017/gebeyaye_test"; // this is for test env
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("The server is conected...");
  })
  .catch((e) => {
    console.log("somting bad happen", e);
  });

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/api/product", product);
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/cart", cart);
app.use("/api/order", order);
app.use("/api/advert", advert);
app.use("/api/message", message);
app.use("/api/payment", payment);

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`The server is Runnig on port number ${PORT}`);
});

module.exports = server;
