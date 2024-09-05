const { Product, validateProduct } = require("../models/Product");
const { User } = require("../models/User");
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};
const search = async (req, res) => {
  try {
    const { category = 'all', productName = '' } = req.query;
    let query = {};

    if (category !== 'all') {
      query.category = category;
    }

    if (productName) {
      query.name = new RegExp(productName, "i");
    }

    const results = await Product.find(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.send(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getOwndProduct = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const products = await Product.find({ owner: ownerId });
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createProduct = async (req, res) => {
  try {
    const validationResult = validateProduct(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const { name, price, description, stock, category } =
      validationResult.value;

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      category,
    });
    newProduct.owner = req.user._id;

    if (req.file) {

      newProduct.imageurl = req.file.path
    }

    const savedProduct = await newProduct.save();

    res.status(201).send(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const modifyProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const validationResult = validateProduct(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const { name, price, description, stock, category } =
      validationResult.value;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, stock, category },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.send(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }

    res.send(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllProduct,
  getProduct,
  createProduct,
  modifyProduct,
  deleteProduct,
  search,
  getOwndProduct,
};
