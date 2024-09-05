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
  changependingVendor,
  getVendorApproved,
  deleteUser,
  deleteMySelf,
  changeMyStuates,
  changeMyStuatesDown,
} = require("../controllers/userControllers");

router.post(
  "/",
  upload.fields([
    { name: "licence", maxCount: 1, optional: true },
    { name: "profilePicture", maxCount: 1, optional: true },
  ]),
  userRegister
);

router.get("/me", auth, getUser);
router.get("/", admin, getVendorPending);
router.put("/cangeVendorStatus/:id", admin, changeVendorStatus);
router.put("/changepending/:id", admin, changependingVendor);
router.post("/vendor", upload.none(), getuserByUsername);

router.get("/approvedVendor", admin, getVendorApproved);
router.delete("/:id", admin, deleteUser);
router.delete("/profile", auth, deleteMySelf);
router.patch("/upgrade", auth, changeMyStuates);
router.patch("/downgrade", auth, changeMyStuatesDown);

module.exports = router;
