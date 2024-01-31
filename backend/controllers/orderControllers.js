const Order = require("../models/Order");
const { Product } = require("../models/Product");
const { User } = require("../models/User");
const Cart = require("../models/Cart");

const getOrder = async (req, res) => {
  try {
    const order = await Order.find();
    res.send(order);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const order = await Order.find({ user: userId });

    if (!order) {
      return res.status(404).send("order not found");
    }

    res.send(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Internal Server Error");
  }
};

const addOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const order = new Order({
      user: userId,
      userName: user.name,
      products: req.body.productDetail,
      totalAmount: req.body.totalAmount,
      deliveryDate: req.body.date,
      deliveryLocation: req.body.location,
    });

    const savedOrder = await order.save();
    console.log("success");

    user.cart = [];
    await user.save();

    res.status(201).send(savedOrder);
  } catch (error) {
    console.error("Error creating Order:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const order = await Order.findOne({ user: userId });

    if (!order) {
      return res.status(404).send("Order not found for the user");
    }

    const productId = req.body.productId;

    const productIndex = order.products.findIndex(
      (product) => product.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).send("Product not found in the order");
    }

    let removedProduct = order.products.splice(productIndex, 1)[0];
    const product = await Product.findById(productId);

    order.totalAmount -= removedProduct.quantity * product.price;

    const savedOrder = await order.save();

    res.status(200).send(savedOrder);
  } catch (error) {
    console.error("Error deleting product from order:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getVendorOrder = async (req, res) => {
  try {
    const userID = req.user._id;
    const sales = await Order.find({ "products.product_owner": userID });
    res.json(sales);
  } catch (error) {
    console.error("Error searching sales data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getOrder,
  addOrder,
  deleteOrder,
  getUserOrder,
  getVendorOrder,
};
