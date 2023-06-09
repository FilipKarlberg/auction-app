const multer = require("multer");

const MAX_FILESIZE = 5000000; // 500kb
const MAX_FILEAMOUNT = 1; // max number of files

// multer storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // filename for the uploaded image
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("file is not of the correct type"), false);
  }
};

const handleMulterErrors = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "Image file size is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        error: `Please only provide ${MAX_FILEAMOUNT} image file`,
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        error: "The file provided is not an image",
      });
    }
  }

  // If the error is not a multer error, pass it to the next middleware
  next(error);
};

// create the multer middleware
const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILESIZE, files: MAX_FILEAMOUNT },
});

module.exports = { uploadMiddleware, handleMulterErrors };
