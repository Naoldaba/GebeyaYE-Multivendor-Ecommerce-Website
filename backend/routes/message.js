const express = require("express");
const router = express.Router();
const auth= require('../middleware/auth')

const {
  getMyMessage,
  sendMessage,
  getAllMessages,
  sendReply
} = require("../controllers/messageControllers");
// Send a message
router.post("/send",auth, sendMessage);
router.post("/sendreply",auth, sendReply);

// Get messages for a user
router.get("/myinbox",auth, getMyMessage);
router.get('/inboxes', auth, getAllMessages);

module.exports = router;
