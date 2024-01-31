const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
  },
  receiver: {
    type: String,

    required: true,
  },
  reply: {
    type: String,
    default: "",
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
