const { getConnection, releaseConnection } = require("../../config/db_config");

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

      if (password !== user.PASSWORD) {
        res.status(401).send("Invalid credentials");
        return;
      }

      res.status(200).send("User logged in");
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
