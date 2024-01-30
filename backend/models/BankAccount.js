const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required:true
  },
  balance: {
    type: Number,
    required: true
  },
  email:{
    type: String,
    required: true
  }
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
