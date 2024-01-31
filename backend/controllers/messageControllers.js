const Message = require("../models/Message");
const { User } = require("../models/User");

const sendMessage = async (req, res) => {
  try {
    const sender_id = req.user._id;
    const sender_user = await User.findById(sender_id);
    const sender = sender_user.username;
    const { receiver, content } = req.body;

    const message = new Message({ sender_id, sender, receiver, content });
    const savedMessage = await message.save();

    res.status(201).send(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getMyMessage = async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [{ sender_id: userId }, { receiver: userId }],
    });

    res.status(200).send(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const messages = await Message.find({
      receiver: "Admin",
      isRead: false,
    }).sort({ timestamp: -1 });
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const sendReply = async (req, res) => {
  try {
    const msg_id = req.body.msg_id;
    console.log(msg_id);
    let msg = await Message.findById(msg_id);

    if (req.body.reply) {
      msg.reply = req.body.reply;
      msg.isRead = req.body.isRead;
    }

    msg = await msg.save();
    return res.status(201).send(msg);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  sendReply,
  sendMessage,
  getAllMessages,
  getMyMessage,
};
