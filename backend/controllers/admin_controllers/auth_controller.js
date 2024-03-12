const { getConnection, releaseConnection } = require("../../config/db_config");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { email, password } = req.body;

    const query = "SELECT * FROM USER WHERE MAIL = ?";

    connection.query(query, [email], (error, results) => {
      if (error) {
        res.status(500).send(error.message);
        return;
      }

      if (results.length === 0) {
        res.status(404).send("User not found");
        return;
      }

      const user = results[0];

      bcrypt.compare(password, user.PASSWORD, (err, result) => {
        if (err) {
          res.status(500).send(err.message);
          return;
        }

        if (result) {
          res.status(200).send(user);
        } else {
          res.status(401).send("Invalid password");
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
  login,
};
