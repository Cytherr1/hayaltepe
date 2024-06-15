const { getConnection, releaseConnection } = require("../../config/db_config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const login = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const { email, password } = req.body;

    const query = "SELECT * FROM USER WHERE MAIL = ?";

    connection.query(query, [email], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      if (results.length === 0) {
        res.status(500).json({ error: error.message });
        return;
      }

      const user = results[0];

      const isMatch = bcrypt.compare(password, user.PASSWORD);

      if (!isMatch) {
        res.status(500).json({ error: error.message });
        return;
      }

      const token = jwt.sign(req.body, secret, {expiresIn: '4h'})

      res.status(200).json({ success: true, accessToken: token});

    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      releaseConnection(connection);
    }
  }
};

const register = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { name, surname, tel, email, password } = req.body;
    const role = "U"
    const query =
      "INSERT INTO USER (NAME, SURNAME, TELEPHONE_NUMBER, MAIL, PASSWORD, ROLE_FILTER) VALUES (?, ?, ?, ?, ?, ?)";

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      query,
      [name, surname, tel, email, hashedPassword, role],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json({ success: true });
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

module.exports = {
  login,
  register,
};
