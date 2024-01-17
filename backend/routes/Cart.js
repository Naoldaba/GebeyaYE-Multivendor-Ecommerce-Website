const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addCartItem,
  removeCartItem,
  getCartItem,
} = require("../controllers/cartControllers");

// Route to get all products
router.get("/", auth, getCartItem);

// Route to create a new product
router.post("/", auth, addCartItem);

// router.put("/:id", auth,);  no need to eddite cart

//router to remove one product
router.delete("/:id", auth, removeCartItem);

module.exports = router;
