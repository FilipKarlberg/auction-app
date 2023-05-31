const path = require("path");

// get single image
const getImage = async (req, res) => {
  const imageName = req.params.imageName;
  console.log(imageName);
  const imagePath = path.join(__dirname, "../public/uploads", imageName);

  res.status(200).sendFile(imagePath);
};

module.exports = {
  getImage,
};
