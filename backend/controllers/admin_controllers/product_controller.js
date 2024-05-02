const { getConnection, releaseConnection } = require("../../config/db_config");

const getAllProduct = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT ID, NAME, IMAGE, LINK FROM PRODUCT";

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
    const image = req.file.filename;
    console.log(image);
    const addQuery = "INSERT INTO PRODUCT (NAME, IMAGE, LINK) VALUES (?,?,?)";
    const logQuery =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    await connection.beginTransaction();

    connection.query(
      addQuery,
      [name, image, link],
      async (error, addResult) => {
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

  try {
    connection = await getConnection();

    const { name, link, id } = req.body;
    const image = req.file.filename;

    let updateQuery = "UPDATE PRODUCT SET";
    const updateValues = [];

    if (name !== undefined) {
      updateQuery += " NAME = ?,";
      updateValues.push(name);
    }

    if (image !== undefined) {
      updateQuery += " IMAGE = ?,";
      updateValues.push(image);
    }

    if (link !== undefined) {
      updateQuery += " LINK = ?,";
      updateValues.push(link);
    }

    updateQuery = updateQuery.slice(0, -1) + " WHERE ID = ?";
    updateValues.push(id);

    const logQuery =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    await connection.beginTransaction();

    connection.query(updateQuery, updateValues, async (error, updateResult) => {
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
        }
      );
    });

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
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
