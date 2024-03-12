const { getConnection, releaseConnection } = require("../../config/db_config");
const { addLog } = require("../log_controllers/log_controller");

const getAllProduct = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM PRODUCT";

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

const addProduct = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { name, price, descr, stock, image, log_user } = req.body;

    const query =
      "INSERT INTO PRODUCT (PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_DESCR, PRODUCT_STOCK, PRODUCT_IMAGE) VALUES (?, ?, ?, ?, ?)";

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
        query += "PRODUCT_NAME = ?, ";
        params.push(name);
      }

      if (price) {
        query += "PRODUCT_PRICE = ?, ";
        params.push(price);
      }

      if (descr) {
        query += "PRODUCT_DESCR = ?, ";
        params.push(descr);
      }

      if (stock) {
        query += "PRODUCT_STOCK = ?, ";
        params.push(stock);
      }

      if (image) {
        query += "PRODUCT_IMAGE = ?, ";
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
      query += "AND PRODUCT_NAME LIKE ? ";

      params.push("%" + name + "%");
    }

    if (price) {
      query += "AND PRODUCT_PRICE = ? ";

      params.push(price);
    }

    if (stock) {
      query += "AND PRODUCT_STOCK = ? ";

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
  getAllProduct,
  addProduct,
  removeProduct,
  updateProduct,
  getProductsFiltered,
};
