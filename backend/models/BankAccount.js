const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  balance: {
    type: Number,
    default: 1000,
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
