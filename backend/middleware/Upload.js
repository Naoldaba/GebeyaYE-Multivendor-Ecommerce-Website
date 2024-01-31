const multer = require("multer");
const path = require("path");

const uploadPath = path.join(__dirname, "..", "public", "images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(uploadPath, "/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,

  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
