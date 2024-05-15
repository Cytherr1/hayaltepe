const { getConnection, releaseConnection } = require("../../config/db_config");

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
    const addQuery =
      "INSERT INTO USER (NAME, SURNAME, MAIL, PASSWORD, TELEPHONE_NUMBER) VALUES (?, ?, ?, ?, ?)";
    const logQuery =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    await connection.beginTransaction();

    connection.query(
      addQuery,
      [name, surname, mail, password, tel],
      async (error, addResult) => {
        if (error) {
          await connection.rollback();
          res.status(500).json({ error: error.message });
          return;
        }

        connection.query(
          logQuery,
          ["Admin", new Date(), "User added successfully"],
          async (error, logResult) => {
            if (error) {
              await connection.rollback();
              res.status(500).json({ error: error.message });
              return;
            }
            await connection.commit();
            res
              .status(200)
              .json({ success: true, message: "User added successfully" });
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

const updateUser = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id, name, surname, mail, password, tel } = req.body;

    let updateQuery = "UPDATE USER SET";
    const updateValues = [];

    if (name !== undefined) {
      updateQuery += " NAME = ?,";
      updateValues.push(name);
    }

    if (surname !== undefined) {
      updateQuery += " SURNAME = ?,";
      updateValues.push(surname);
    }

    if (mail !== undefined) {
      updateQuery += " MAIL = ?,";
      updateValues.push(mail);
    }

    if (password !== undefined) {
      updateQuery += " PASSWORD = ?,";
      updateValues.push(password);
    }

    if (tel !== undefined) {
      updateQuery += " TELEPHONE_NUMBER = ?,";
      updateValues.push(tel);
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
        ["Admin", new Date(), "User updated successfully"],
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
        ["Admin", new Date(), "User removed successfully"],
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
