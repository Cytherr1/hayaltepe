const { getConnection, releaseConnection } = require("../../config/db_config");
const { addLog } = require("../log_controllers/log_controller");

const getAllProduct = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM PRODUCT";

    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ error : error.message });
      } else {
        res.status(200).json({ success: true, products: results})
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

const addProduct = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { name, image, link, log_user } = req.body;

    const query = "INSERT INTO PRODUCT (NAME, IMAGE, LINK)  VALUES (?, ?, ?)";

    const log_query =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    connection.beginTransaction((beginError) => {
      if (beginError) {
        res.status(500).send(beginError.message);
        return;
      }

      connection.query(query, [name, image, link], (error, results) => {
        if (error) {
          connection.rollback(() => {
            res.status(500).send(error.message);
          });
        } else {
          connection.query(
            log_query,
            [log_user, new Date(), "Product added successfully"],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  res.status(500).send(error.message);
                });
              } else {
                connection.commit((commitError) => {
                  if (commitError) {
                    connection.rollback(() => {
                      res.status(500).send(commitError.message);
                    });
                  } else {
                    res.status(201).send("Product added successfully");
                  }
                });
              }
            }
          );
        }
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const removeProduct = async (req, res) => {
  let connection;

  try {
    connection = getConnection();

    const { id, log_user } = req.body;

    const query = "DELETE FROM PRODUCT WHERE ID = ?";

    const log_query =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    connection.beginTransaction((beginError) => {
      if (beginError) {
        res.status(500).send(beginError.message);
        return;
      }

      connection.query(query, [id], (error, results) => {
        if (error) {
          connection.rollback(() => {
            res.status(500).send(error.message);
          });
        } else {
          connection.query(
            log_query,
            [log_user, new Date(), "Product removed successfully"],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  res.status(500).send(error.message);
                });
              } else {
                connection.commit((commitError) => {
                  if (commitError) {
                    connection.rollback(() => {
                      res.status(500).send(commitError.message);
                    });
                  } else {
                    res.status(200).send("Product removed successfully");
                  }
                });
              }
            }
          );
        }
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
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

    const { id, name, image, link, log_user } = req.body;

    let query = "UPDATE PRODUCT SET ";

    const log_query =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    const params = [];

    connection.beginTransaction((beginError) => {
      if (beginError) {
        res.status(500).send(beginError.message);
        return;
      }

      if (name) {
        query += "NAME = ?, ";
        params.push(name);
      }

      if (image) {
        query += "IMAGE = ?, ";
        params.push(image);
      }

      if (link) {
        query += "LINK = ?, ";
        params.push(link);
      }

      query = query.slice(0, -2);
      query += " WHERE ID = ?";
      params.push(req.params.id);

      connection.query(query, params, (error, results) => {
        if (error) {
          connection.rollback(() => {
            res.status(500).send(error.message);
          });
        } else {
          connection.query(
            log_query,
            [log_user, new Date(), "Product updated successfully"],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  res.status(500).send(error.message);
                });
              } else {
                connection.commit((commitError) => {
                  if (commitError) {
                    connection.rollback(() => {
                      res.status(500).send(commitError.message);
                    });
                  } else {
                    res.status(200).send("Product updated successfully");
                  }
                });
              }
            }
          );
        }
      });
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
  getAllProduct,
  addProduct,
  removeProduct,
  updateProduct,
};
