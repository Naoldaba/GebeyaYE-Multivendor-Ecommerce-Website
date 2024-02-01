const mongoose = require("mongoose");
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: true,
    minlength: 5,
    maxlength: 255,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
  },
  phone: {
    type: Number,
    required: true,
  },
  accountNumber: {
    type: Number,

    unique: true,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Buyer", "Vendor", "Admin", "vendorPendding"],
    required: true,
  },

  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
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
    },
  ],

  licence: {
    type: String,
  },

  payment: {
    type: String,
  },

  isPremium: {
    type: Boolean,
    default: false,
  },

  profilePicture: {
    type: String,
  },

  status: {
    type: String,
  },
});

UserSchema.methods.generetAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role, isPremium: this.isPremium },
    "jobman2008"
  );
  return token;
};

const User = mongoose.model("user", UserSchema);

function UserValidater(product) {
  const schem = Joi.object({
    name: Joi.string().required().min(5).max(255),
    username: Joi.string().required().min(5).max(255),
    phone: Joi.number().required(),
    email: Joi.string().required().min(5).max(255).email(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(2)
      .minOfLowercase(2)
      .minOfUppercase(2)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .required(),
    accountNumber: Joi.number().required(),
    role: Joi.string().required(),
    isPremium: Joi.boolean(),
    address: Joi.string(),
    status: Joi.string(),
  });

  return schem.validate(product);
}

module.exports.User = User;
module.exports.UserValidater = UserValidater;
