const express = require("express");
const uplode = require("../middleware/Upload");
const router = express.Router();

const { premiumPayment } = require("../controllers/paymentControllers");

router.post("/premium", uplode.none(), premiumPayment);

module.exports = router;
