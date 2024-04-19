const multer = require("multer");

// Multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Multer middleware. Must be handled for features.
const upload = multer({ storage: storage });

module.exports = upload;