const express = require("express");
const route = express.Router();
const premiumVendor = require("../middleware/premiumVendor");
const Upload = require("../middleware/Upload");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  getAdvert,
  createAdvert,
  changeAdvertStatus,
  deleteAdvert,
  allAdverts
} = require("../controllers/advertisementControllers");

route.get("/", auth, getAdvert);

route.post("/", premiumVendor, Upload.single("banner"), auth, createAdvert);

route.get('/all', allAdverts)

route.put("/:id", admin, changeAdvertStatus);

route.delete('/:id', admin, deleteAdvert)

module.exports = route;
