const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
      product_name: {type: String, required: true,},
      product_owner: {type: mongoose.Schema.Types.ObjectId, required: true }
    },
  ],
  totalAmount: { type: Number, required: true },
  deliveryDate: { type: String, required: true }, 
  deliveryLocation: {type: String, requied: true },
  serviceFee:{type: Number, required: true}
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
