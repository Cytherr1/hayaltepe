const { getConnection, releaseConnection } = require("../../config/db_config");

const addLog = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { log_user, log_timestamp, log_descr } = req.body;

    const query =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    connection.query(
      query,
      [log_user, log_timestamp, log_descr],
      (error, results) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(201).send("Log added successfully");
        }
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const getAllLogs = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM LOG";

    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ error : error.message });
      } else {
        res.status(200).json({ success: true, logs: results})
      }
    });
  } catch (error) {
    res.status(500).json({ error : error.message });;
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

module.exports = {
  addLog,
  getAllLogs,
};
