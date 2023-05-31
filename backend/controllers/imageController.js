const path = require("path");
const fs = require("fs");

// Get single image
const getImage = async (req, res) => {
  try {
    const imageName = req.params.imageName;

    // Image file is located locally
    const imagePath = path.join(__dirname, "../public/uploads", imageName);

    // Check if the image file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getImage,
};
