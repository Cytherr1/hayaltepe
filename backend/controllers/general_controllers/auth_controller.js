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

      const isMatch = bcrypt.compare(password, user.PASSWORD);

      if (!isMatch) {
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

const register = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { name, surname, tel, email, password } = req.body;

    const query =
      "INSERT INTO USER (NAME, SURNAME, TELEPHONE_NUMBER, MAIL, PASSWORD) VALUES (?, ?, ?, ?, ?)";

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      query,
      [name, surname, tel, email, hashedPassword],
      (error, results) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(201).send("User registered");
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
