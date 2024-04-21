const { getConnection, releaseConnection } = require("../../config/db_config");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const uploadImageMiddleware = upload.single("image");

const uploadImage = async (req, res) => {
  let connection;
  let query;

  try {
    uploadImageMiddleware(req, res, async (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      connection = await getConnection();
      const image = req.file.filename;
      const { id } = req.body;

      query = "UPDATE PRODUCT SET IMAGE = ? WHERE ID = ?";

      connection.query(query, [image, id], (error, results) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }

        res
        .status(200)
        .sendFile(path.join(__dirname, "../../../public/images", image));
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const displayImage = async (req, res) => {
  let connection;
  let query;

  try {
    connection = await getConnection();

    const { id } = req.query;

    query = "SELECT IMAGE FROM PRODUCT WHERE ID = ?";

    connection.query(query, [id], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Image not found" });
        return;
      }

      const image = results[0].IMAGE;
      res
        .status(200)
        .sendFile(path.join(__dirname, "../../../public/images", image));
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

module.exports = {
  uploadImage,
  displayImage,
};
