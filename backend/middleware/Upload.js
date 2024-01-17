const multer = require("multer");
const path = require("path");

const uploadPath = path.join(__dirname, "..", "public", "images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(uploadPath, "/")); // Full path including timestamp folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Include file extension
  },
});
const upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   if (
  //     file.mimetype == "image/jpg" ||
  //     file.mimetype == "image/png" ||
  //     file.mimetype == "image/JPG"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     console.log("The file type is must be png or jpg");
  //     cb(null, false);
  //   }
  // },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
