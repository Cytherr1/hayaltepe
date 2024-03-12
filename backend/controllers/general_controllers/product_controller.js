const { getConnection, releaseConnection } = require("../../config/db_config");

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

const getProductsFiltered = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const { name, price, stock } = req.body;

    let query = "SELECT * FROM PRODUCT WHERE 1=1 ";

    const params = []; // Define an array to store parameters

    if (name) {
      query += "AND PRODUCT_NAME LIKE ? ";
      params.push("%" + name + "%");
    }

    if (stock === "true") {
      query += "AND PRODUCT_STOCK > 0 ";
    }

    if (price === "low") {
      query += "ORDER BY PRODUCT_PRICE DESC";
    }

    if (price === "high") {
      query += "ORDER BY PRODUCT_PRICE ASC";
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
  getProductsFiltered,
};
