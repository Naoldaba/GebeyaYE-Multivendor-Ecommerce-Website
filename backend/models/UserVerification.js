const mongoose = require('mongoose');

const userVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  verificationCode: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '50m' 
  }
});


const UserVerification = mongoose.model('UserVerification', userVerificationSchema);

module.exports = UserVerification;
