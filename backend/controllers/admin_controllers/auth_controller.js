const { getConnection, releaseConnection } = require("../../config/db_config");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const login = async (req, res) => {
  let connection;
  let query;
  try {
    connection = await getConnection();

    const { email, password } = req.body;

    query = "SELECT MAIL, PASSWORD, ROLE_FILTER FROM USER WHERE ROLE_FILTER = 'AU' AND MAIL = ?";

    connection.query(query, [email], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const user = results[0];

      if (password !== user.PASSWORD) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      const token = jwt.sign(req.body, secret, {expiresIn: '4h'})

      res.status(200).json({ success: true, message: "User logged in", accessToken: token});
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

module.exports = {
  login,
};
