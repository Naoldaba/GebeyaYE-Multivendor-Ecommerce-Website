const { User } = require("../models/User");
const { Product } = require("../models/Product");

const getCartItem = async (req, res) => {
  try {
    // Use async/await to fetch all products from the database
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

    // const product = req.body.item;  // here insted naol will send a product id thire for i have to populate using that id

    const productId = req.body.productId; // he must be give product id as productID

    const product = await Product.findById(productId);

    // Check if the product is already in the user's cart
    // console.log(user.cart[0]);
    // console.log(user.cart[0]._id.toString());
    // console.log(product);

    // const existingCartItem = user.cart.find((item) => item.product == product);
    // console.log(existingCartItem);

    // if (existingCartItem) {
    //   // If the product is already in the cart, update the quantity
    //   existingCartItem.quantity += parseFloat(quantity);
    // } else {
    // If the product is not in the cart, add it
    if (!product) {
      return res.status(404).send("Product is not Found");
    }
    user.cart.push(product); // why insted of product _id stored in the cart
    // }

    // Save the updated user document with the new cart information
    // console.log(user);
    user = await user.save();

    // Use async/await to create a new product in the database

    res.status(201).send(user.cart);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Route to update a product by ID

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id; // Extracted from the token using middleware

    // Retrieve the user from the database
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const productIdToRemove = req.params.id; // id = producId which removed

    // Find the index of the product in the user's cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item._id == productIdToRemove // here the cart schema is like thsi [ {_id:..., name:...},{_id:...,name:..}]
    );

    console.log(cartItemIndex);

    if (cartItemIndex === -1) {
      return res.status(404).send({ error: "Product not found in the cart" });
    }

    // Remove the product from the cart array
    user.cart.splice(cartItemIndex, 1);

    // Save the updated user document with the removed cart item
    await user.save();

    // Respond with the updated user document (optional)
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
