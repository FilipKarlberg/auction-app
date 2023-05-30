const multer = require("multer");

// multer storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // filename for the uploaded image
  },
});

// create the multer middleware
const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
