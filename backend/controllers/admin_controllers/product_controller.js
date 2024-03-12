const { getConnection, releaseConnection } = require("../../config/db_config");
const { addLog } = require("../log_controllers/log_controller");

const addProduct = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { name, price, descr, stock, image, log_user } = req.body;

    const query =
      "INSERT INTO PRODUCT (NAME, PRICE, DESCR, STOCK, IMAGE) VALUES (?, ?, ?, ?, ?)";

    const log_query =
      "INSERT INTO LOG (LOG_USER, LOG_TIMESTAMP, LOG_DESCR) VALUES (?, ?, ?)";

    connection.beginTransaction((beginError) => {
      if (beginError) {
        res.status(500).send(beginError.message);
        return;
      }

      connection.query(
        query,
        [name, price, descr, stock, image],
        (error, results) => {
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
        }
      );
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

    const { name, price, descr, stock, image, log_user } = req.body;

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

      if (price) {
        query += "PRICE = ?, ";
        params.push(price);
      }

      if (descr) {
        query += "DESCR = ?, ";
        params.push(descr);
      }

      if (stock) {
        query += "STOCK = ?, ";
        params.push(stock);
      }

      if (image) {
        query += "IMAGE = ?, ";
        params.push(image);
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

const getProductsFiltered = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { name, price, stock } = req.body;

    let query = "SELECT * FROM PRODUCT WHERE 1=1 ";

    const params = [];

    if (name) {
      query += "AND NAME LIKE ? ";

      params.push("%" + name + "%");
    }

    if (price) {
      query += "AND PRICE = ? ";

      params.push(price);
    }

    if (stock) {
      query += "AND STOCK = ? ";

      params.push(stock);
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

module.exports = {
  addProduct,
  removeProduct,
  updateProduct,
  getProductsFiltered,
};
