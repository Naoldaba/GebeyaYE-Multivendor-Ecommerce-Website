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

// Route to get all products
router.get("/", getAllProduct);

//Route to search product by category and name
router.get("/search", search);

router.get("/myproduct", auth, getOwndProduct);

// Route to get a product by ID
router.get("/:id", getProduct);

// Route to create a new product
router.post("/", auth, upload.single("productImage"), createProduct); // before upploading I need to find the user._id from the req.body

// Route to update a product by ID
router.put("/:id", auth, upload.single("productImage"), modifyProduct);

// Route to delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
