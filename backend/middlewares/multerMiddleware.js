const multer = require("multer");
const path = require("path");

// Multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

// Multer middleware. Must be handled for features.
const upload = multer({ storage: storage });

module.exports = upload;