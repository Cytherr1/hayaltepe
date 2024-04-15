const { getConnection, releaseConnection } = require("../../config/db_config");

const login = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { mail, password } = req.body;

    const query = "SELECT * FROM USER WHERE MAIL = ?";

    connection.query(query, [mail], (error, results) => {
      if (error) {
        res.status(500).send(error.message);
        return;
      }

      if (results.length === 0) {
        res.status(404).send("User not found");
        return;
      }

      const user = results[0];

      if (user.password !== password) {
        res.status(401).send("Invalid password");
        return;
      }

      else {
        res.status(200).send(user);
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
  login,
};
