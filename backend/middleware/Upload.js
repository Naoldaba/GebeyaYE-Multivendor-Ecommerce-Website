// const multer = require("multer");


// const uploadPath = path.join(__dirname, "..", "public", "images");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(uploadPath, "/"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({
//   storage: storage,

//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// });

// module.exports = upload;



const cloudinary = require('cloudinary').v2;
const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET, 
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'GebeyaYe', 
    format: async (req, file) => 'jpg', 
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, 
  },
  fileFilter: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const allowedFormats = ['.jpeg', '.jpg', '.png'];

    if (!allowedFormats.includes(fileExtension)) {
      return cb(new Error('Only .jpeg, .jpg, and .png formats are allowed!'), false);
    }

    cb(null, true);
  },
});

module.exports = upload;
