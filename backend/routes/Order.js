const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  getOrder,
  addOrder,
  deleteOrder,
  getUserOrder,
  getVendorOrder,
} = require("../controllers/orderControllers");

router.get("/", admin, getOrder);

router.get("/myorder", auth, getUserOrder);

router.post("/", auth, addOrder);

router.get("/sales_report", auth, getVendorOrder);

module.exports = router;
