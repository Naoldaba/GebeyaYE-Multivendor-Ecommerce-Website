const { User } = require("../models/User");
const { Product } = require("../models/Product");

const getCartItem = async (req, res) => {
  try {
    const userId = req.user._id;

    const usercart = await User.find({ _id: userId }).select("cart");
    res.status(200).send(usercart);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

const addCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const productId = req.body.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product is not Found");
    }
    user.cart.push(product);

    user = await user.save();

    res.status(201).send(user.cart);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const productIdToRemove = req.params.id;

    const cartItemIndex = user.cart.findIndex(
      (item) => item._id == productIdToRemove
    );


    if (cartItemIndex === -1) {
      return res.status(404).send({ error: "Product not found in the cart" });
    }

    user.cart.splice(cartItemIndex, 1);

    await user.save();

    res.status(200).send(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  removeCartItem,
  addCartItem,
  getCartItem,
};
