const BankAccount = require("../models/BankAccount");
const nodemailer = require('nodemailer');
const UserVerification = require('../models/UserVerification');
const { User } = require("../models/User");

// const PAYMENT_FOR_PREMIUM = 3500;
// const premiumPayment = async (req, res) => {
//   try {
//     const accountNumber = req.body.accountNumber;
//     const userName = req.body.name;

//     let account = await BankAccount.findOne({ accountNumber: accountNumber });

//     if (!account || account.balance < PAYMENT_FOR_PREMIUM) {
//       return res.status(404).send("account not found");
//     }

//     account.balance-= PAYMENT_FOR_PREMIUM;

//     account = await account.save();

//     const user = await User.findOne({ username: userName });
//     user.payment = "Approved";
//     const savedUser = await user.save();

//     res.status(200).send(savedUser);
//   } catch (error) {
//     console.error("Error fetching account:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };


//sendVerficationEmail
async function sendVerificationEmail(email, verificationCode) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'gebeyaye@gmail.com',
        pass: 'avoe yuqh mnfm lgfz'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    const mailOptions = {
      from: 'gebeyaye@gmail.com',
      to: email,
      subject: 'Verification Code for Premium Payment',
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('mail successfully sent')
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}

const verifyAccount = async (req, res)=> {
  try {
    const { accountNumber } = req.body;

    const user = await BankAccount.findOne({accountNumber:accountNumber})

    if (!user){
      return res.status(404).send("Account Not Found")
    }

    const email=user.email;
    console.log(user)

    const verificationCode = generateVerificationCode();

    await UserVerification.create({ email, verificationCode });

    await sendVerificationEmail(email, verificationCode);

    res.status(200).send("Verification code sent successfully.");
  } catch (error) {
    console.error("Error performing premium payment:", error);
    res.status(500).send("Internal Server Error");
  }
}

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


//Verify verification code
const performPremiumPayment= async(req, res) => {
  try {
    const { verificationCode, balance, accountNumber, username } = req.body;

    const user= await BankAccount.findOne({accountNumber});
    const email=user.email;

    const userVerification = await UserVerification.findOne({ email });

    if (!userVerification) {
      return res.status(404).send("Verification code record not found.");
    }

    if (userVerification.verificationCode === verificationCode) {
     
      const bankAccount = await BankAccount.findOne({ email });

      if (!bankAccount) {
        return res.status(404).send("Bank account not found.");
      }

      if (bankAccount.balance < balance) {
        return res.status(400).send("Insufficient balance for payment.");
      }

      bankAccount.balance -= balance;
      await bankAccount.save();
      
      const Vendor= await User.findOne({username:username});
      Vendor.payment="approved";
      await Vendor.save()

      console.log('approved');
      await UserVerification.deleteOne({ email });

      res.status(200).send("Payment successful. Amount deducted from the account.");
    } else {
      res.status(401).send("Invalid verification code.");
    }
  } catch (error) {
    console.error("Error verifying verification code:", error);
    res.status(500).send("Internal Server Error");
  }
}


const performProductPayment= async (req, res)=>{
  try{
      const {accountNumber, verificationCode, amount}= req.body;
      const user= await BankAccount.findOne({accountNumber});
      const email=user.email;

      const userVerification = await UserVerification.findOne({ email });
    
      if (!userVerification) {
        return res.status(404).send("Verification code record not found.");
      }

      if (userVerification.verificationCode === verificationCode){
        const bankAccount = await BankAccount.findOne({ email });

        if (!bankAccount) {
          return res.status(404).send("Bank account not found.");
        }
  
        if (bankAccount.balance < amount) {
          return res.status(400).send("Insufficient fund for making a purchase.");
        }
  
        bankAccount.balance -= amount;
        await bankAccount.save();
  
        console.log('approved');
        await UserVerification.deleteOne({ email });
  
        res.status(200).send("Payment successful. Amount deducted from the account.");
      } else {
      res.status(401).send("Invalid verification code.");
      }

  } catch(error){

  }
}

module.exports = { performPremiumPayment, verifyAccount, performProductPayment };
