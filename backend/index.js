const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
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
dotenv.config();

const mongoURL = process.env.CONNECTION_URL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("The database is conected...");
    app.listen(process.env.PORT, () => {
      console.log(`The server is Runnig on port ${process.env.PORT}`);
    });
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

app.get('/', (req, res)=>{
  res.status(200).send('welcome amigos');
})


module.exports = app;
