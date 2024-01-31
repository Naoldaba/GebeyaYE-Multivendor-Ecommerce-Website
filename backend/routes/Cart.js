const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addCartItem,
  removeCartItem,
  getCartItem,
} = require("../controllers/cartControllers");

router.get("/", auth, getCartItem);

router.post("/", auth, addCartItem);

//router to remove one product
router.delete("/:id", auth, removeCartItem);

module.exports = router;
