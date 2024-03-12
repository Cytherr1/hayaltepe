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

const removeLog = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    const query = "DELETE FROM LOG WHERE ID = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send("Log deleted successfully");
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const updateLog = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { log_user, log_timestamp, log_descr } = req.body;

    let query = "UPDATE LOG SET ";

    const params = [];

    if (log_user) {
      query += "LOG_USER = ?, ";
      params.push(log_user);
    }

    if (log_timestamp) {
      query += "LOG_TIMESTAMP = ?, ";
      params.push(log_timestamp);
    }

    if (log_descr) {
      query += "LOG_DESCR = ?, ";
      params.push(log_descr);
    }

    query = query.slice(0, -2);
    query += " WHERE ID = ?";

    params.push(req.params.id);

    connection.query(query, params, (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send("Log updated successfully");
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const getLogsFiltered = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { log_user, log_timestamp, log_descr } = req.body;

    let query = "SELECT * FROM LOG WHERE 1=1 ";

    const params = [];

    if (log_user) {
      query += "AND LOG_USER = ? ";
      params.push(log_user);
    }

    if (log_timestamp) {
      query += "AND LOG_TIMESTAMP = ? ";
      params.push(log_timestamp);
    }

    if (log_descr) {
      query += "AND LOG_DESCR = ? ";
      params.push(log_descr);
    }

    connection.query(query, params, (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send(results);
      }
    });
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
        res.status(500).send(error.message);
      } else {
        res.status(200).send(results);
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

module.exports = {
  addLog,
  removeLog,
  updateLog,
  getLogsFiltered,
  getAllLogs,
};
