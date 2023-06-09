const express = require("express");
const { getImage } = require("../controllers/imageController");
const router = express.Router();

// GET a single image
router.get("/:imageName", getImage);

module.exports = router;
