const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  getOrder,
  addOrder,
  deleteOrder,
  getUserOrder,
  getVendorOrder
} = require("../controllers/orderControllers");

// Route to get all O
router.get("/", admin, getOrder);

// Route to get a product by ID
router.get("/myorder", auth, getUserOrder);

// Route to create a new order
router.post("/", auth, addOrder);

router.get('/sales_report', auth, getVendorOrder)

// Route to delete a product by ID
// router.delete("/", auth, deleteOrder);----- no need to delete

module.exports = router;
