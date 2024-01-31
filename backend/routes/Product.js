const express = require("express");
const router = express.Router();
const upload = require("../middleware/Upload");
const {
  modifyProduct,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getOwndProduct,
  search,
} = require("../controllers/productcontrollers");
const auth = require("../middleware/auth");

router.get("/", getAllProduct);

//Route to search product by category and name
router.get("/search", search);

router.get("/myproduct", auth, getOwndProduct);

router.get("/:id", getProduct);

router.post("/", auth, upload.single("productImage"), createProduct);

router.put("/:id", auth, upload.single("productImage"), modifyProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
