const mongoose = require("mongoose");
const Joi = require("joi");

const advertisementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255,
  },
  userName: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  banner: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

function AdvertisementValidater(product) {
  const schem = Joi.object({
    description: Joi.string().required().min(10).max(255),
  });

  return schem.validate(product);
}
module.exports = { Advertisement, AdvertisementValidater };
