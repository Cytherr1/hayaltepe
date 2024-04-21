const { getConnection, releaseConnection } = require("../../config/db_config");

const getAllProduct = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT ID, NAME, IMAGE FROM PRODUCT";

    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ success: true, products: results });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const addProduct = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    
    const { name, link } = req.body;
    const image = req.file;
    const imagePath = image.path;
    const addQuery = "INSERT INTO PRODUCT (NAME, IMAGE, LINK) VALUES (?,?,?)";
    const logQuery =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    await connection.beginTransaction();

<<<<<<< HEAD
    connection.query(
      addQuery,
      [name, image, link],
      async (error, addResult) => {
        if (error) {
          await connection.rollback();
          res.status(500).json({ error: error.message });
          return;
=======
    connection.query(addQuery, [name, imagePath, link], async (error, addResult) => {
      if (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
        return;
      }

      connection.query(
        logQuery,
        ["log_user", new Date(), "Product added successfully"],
        async (error, logResult) => {
          if (error) {
            await connection.rollback();
            res.status(500).json({ error: error.message });
            return;
          }
          await connection.commit();
          res
            .status(200)
            .json({ success: true, message: "Product added successfully" });
>>>>>>> 88e2b3d2c3afbf0843506b3f2c9ca3c7d16ef30e
        }

        connection.query(
          logQuery,
          ["log_user", new Date(), "Product added successfully"],
          async (error, logResult) => {
            if (error) {
              await connection.rollback();
              res.status(500).json({ error: error.message });
              return;
            }
            await connection.commit();
            res
              .status(200)
              .json({ success: true, message: "Product added successfully" });
          }
        );
      }
    );
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const updateProduct = async (req, res) => {
  let connection;
  let query;

  try {
    connection = await getConnection();

    const { id, name, image, link } = req.body;
    query = "UPDATE PRODUCT SET";

    const updateValues = [];
    if (name) {
      query += " NAME = ?,";
      updateValues.push(name);
    }

    if (image) {
      query += " IMAGE = ?,";
      updateValues.push(image);
    }

    if (link) {
      query += " LINK = ?,";
      updateValues.push(link);
    }

    query = query.slice(0, -1);

    query += " WHERE ID = ?";

    const logQuery =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    await connection.beginTransaction();

    connection.query(
      query,
      [...updateValues, id],
      async (error, updateResult) => {
        if (error) {
          await connection.rollback();
          res.status(500).json({ error: error.message });
          return;
        }

        connection.query(
          logQuery,
          ["log_user", new Date(), "Product updated successfully"],
          async (error, logResult) => {
            if (error) {
              await connection.rollback();
              res.status(500).json({ error: error.message });
              return;
            }
            await connection.commit();
            res
              .status(200)
              .json({ success: true, message: "Product updated successfully" });
          }
        );
      }
    );
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const removeProduct = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.body;
    const deleteQuery = "DELETE FROM PRODUCT WHERE ID = ?";
    const logQuery =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    await connection.beginTransaction();

    connection.query(deleteQuery, [id], async (error, deleteResult) => {
      if (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
        return;
      }

      connection.query(
        logQuery,
        ["log_user", new Date(), "Product removed successfully"],
        async (error, logResult) => {
          if (error) {
            await connection.rollback();
            res.status(500).json({ error: error.message });
            return;
          }
          await connection.commit();
          res
            .status(200)
            .json({ success: true, message: "Product removed successfully" });
        }
      );
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

module.exports = {
  getAllProduct,
  addProduct,
  removeProduct,
  updateProduct,
};
