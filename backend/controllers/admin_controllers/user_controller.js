const { getConnection, releaseConnection } = require("../../config/db_config");
const { connect } = require("../../routes/admin/user_routes");
const { addLog } = require("../log_controllers/log_controller");

const getAllUser = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM USER";

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

const addUser = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { name, surname, mail, password, tel } = req.body;
    const addQuery = "INSERT INTO USER (NAME, SURNAME, MAIL, PASSWORD, TEL) VALUES (?,?,?,?,?)";
    const logQuery =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    await connection.beginTransaction();

    connection.query(addQuery, [name, surname, mail, password, tel], async (error, addResult) => {
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
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
      releaseConnection(connection);
    }
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const updateUser = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id, name, surname, mail, password, tel } = req.body;
    const updateQuery = " UPDATE USER ";

    if (name) {
      updateQuery += " SET NAME = ? ";
    }

    if (surname) {
      updateQuery += " SET SURNAME = ? ";
    }

    if (mail) {
      updateQuery += " SET MAIL = ? ";
    }

    if (password) {
      updateQuery += " SET PASSWORD = ? ";
    }

    if (tel) {
      updateQuery += " SET TEL = ? ";
    }

    updateQuery += " WHERE ID = ?";

    const logQuery =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    await connection.beginTransaction();

    connection.query(updateQuery, [id, name, surname, mail, password, tel], async (error, updateResult) => {
      if (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
        return;
      }

      connection.query(
        logQuery,
        ["log_user", new Date(), "User updated successfully"],
        async (error, logResult) => {
          if (error) {
            await connection.rollback();
            res.status(500).json({ error: error.message });
            return;
          }
          await connection.commit();
          res
            .status(200)
            .json({ success: true, message: "User updated successfully" });
        }
      );
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
      releaseConnection(connection);
    }
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const deleteUser = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.body;
    const deleteQuery = "DELETE FROM USER WHERE ID = ?";
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
        ["log_user", new Date(), "User removed successfully"],
        async (error, logResult) => {
          if (error) {
            await connection.rollback();
            res.status(500).json({ error: error.message });
            return;
          }
          await connection.commit();
          res
            .status(200)
            .json({ success: true, message: "User removed successfully" });
        }
      );
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
      releaseConnection(connection);
    }
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

module.exports = {
  getAllUser,
  addUser,
  deleteUser,
  updateUser,
};
