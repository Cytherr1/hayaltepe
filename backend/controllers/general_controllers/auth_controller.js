const { getConnection, releaseConnection } = require("../../config/db_config");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const { email, password } = req.body;

    const query = "SELECT * FROM USER WHERE MAIL = ?";

    connection.query(query, [email], async (error, results) => {
      if (error) {
        res.status(500).send(error.message);
        return;
      }

      if (results.length === 0) {
        res.status(404).send("User not found");
        return;
      }

      const user = results[0];

      try {
        const compareResult = await bcrypt.compare(password, user.PASSWORD);
        if (compareResult) {
          res.status(200).send(user);
        } else {
          res.status(401).send("Invalid password");
        }
      } catch (compareError) {
        res.status(500).send(compareError.message);
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

const register = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { fname, surname, telephone_number, email, password } = req.body;

    const query =
      "INSERT INTO USER (FNAME, SURNAME, TELEPHONE_NUMBER, MAIL, PASSWORD) VALUES (?, ?, ?, ?, ?)";

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      query,
      [fname, surname, telephone_number, email, hashedPassword],
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
