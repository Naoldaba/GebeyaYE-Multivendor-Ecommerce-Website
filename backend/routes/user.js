const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/Upload");
const admin = require("../middleware/admin");
const router = express.Router();
const {
  userRegister,
  getUser,
  changeVendorStatus,
  getVendorPending,
  getuserByUsername,
  changePenddingVendor,
  getVendorApproved,
  deleteUser
} = require("../controllers/userControllers");

router.post(
  "/",
  upload.fields([
    { name: "licence", maxCount: 1, optional: true },
    { name: "profilePicture", maxCount: 1, optional: true },
  ]),
  userRegister
); // file it the input name of the front end
//  in the front end form we have to put the atribute of enctype="mulipart/form-data"
router.get("/me", auth, getUser);
router.get("/", admin, getVendorPending);
router.put("/cangeVendorStatus/:id", admin, changeVendorStatus);
router.put("/changePendding/:id", admin, changePenddingVendor);
router.post("/vendor", upload.none(), getuserByUsername); // this end point creatid to show the stutes of the vendor while the veondor trying to login
// here i will create a delete and get request for all vendors
router.get("/approvedVendor", admin, getVendorApproved);
router.delete("/:id", admin, deleteUser);

module.exports = router;
