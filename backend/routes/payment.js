const express = require("express");
const upload = require("../middleware/Upload");
const router = express.Router();

const { performPremiumPayment, verifyAccount, performProductPayment } = require("../controllers/paymentControllers");

router.post("/verifyaccount",upload.none(), verifyAccount);
router.post('/pay', upload.none(), performPremiumPayment );
router.post('/purchase', upload.none(), performProductPayment)

module.exports = router;
