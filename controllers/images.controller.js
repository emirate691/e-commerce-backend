const Image = require("../models/images.models.js");
const cloudinary = require("../config/cloudinary.config.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Form cannot be empty",
    });
  }
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Upload error, try again",
      });
    } else {
      const images = new Image({
        image: result.url,
        product_id: req.body.product_id,
      });
      Gallery.create(images, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occured while adding your images",
          });
        else res.send(data);
      });
    }
  });
};
