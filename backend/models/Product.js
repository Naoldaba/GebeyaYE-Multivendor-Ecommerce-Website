const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    requred: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

function validateProduct(product) {
  const schem = Joi.object({
    name: Joi.string().required().max(200),
    description: Joi.string().required().max(500),
    price: Joi.number().required(),
    stock: Joi.number().min(1).required(),
    category: Joi.string().required(),
  });

  return schem.validate(product);
}

module.exports.Product = Product;
module.exports.validateProduct = validateProduct;
