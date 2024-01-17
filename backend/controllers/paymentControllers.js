const BankAccount = require("../models/BankAccount");
const { User } = require("../models/User");
const PAYMENT_FOR_PREMIUM = 100;
const premiumPayment = async (req, res) => {
  try {
    const accountNumber = req.body.accountNumber;
    const userName = req.body.name;

    // Use async/await to fetch the product from the database
    let account = await BankAccount.findOne({ accountNumber: accountNumber });

    if (!account) {
      return res.status(404).send("account not found");
    }

    if (account.balance < PAYMENT_FOR_PREMIUM) {
      return res.status(400).send("Balance is insufficent");
    }

    account.balance = account.balance - PAYMENT_FOR_PREMIUM;

    account = await account.save();

    const user = await User.findOne({ username: userName });
    user.payment = "Approved";
    const savedUser = await user.save();

    res.status(200).send(savedUser);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).send("Internal Server Error");
  }
};

const productPayment = async (req, res) => {
  try {
    const accountNumber = req.body.accountNumber;
    const userName = req.body.name;

    // Use async/await to fetch the product from the database
    const account = await BankAccount.findById(accountNumber);

    if (!account) {
      return res.status(404).send("account not found");
    }

    if (account.balance < PAYMENT_FOR_PREMIUM) {
      return res.status(400).send("Balance is insufficent");
    }

    account.balance = acount.balance - PAYMENT_FOR_PREMIUM;
    account.save();

    const user = await User.find({ username: userName });
    user.payment = "Approved";
    const savedUser = await user.save();

    res.status(200).send(savedUser);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { premiumPayment, productPayment };
