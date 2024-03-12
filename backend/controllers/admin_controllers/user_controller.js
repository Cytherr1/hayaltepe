const { getConnection, releaseConnection } = require("../../config/db_config");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      const { fname, lname, tel, email, password } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const query =
        "INSERT INTO USER (FNAME, SURNAME, TELEPHONE_NUMBER, MAIL, PASSWORD) VALUES (?, ?, ?, ?, ?)";
  
      connection.query(
        query,
        [fname, lname, tel, email, hashedPassword],
        (error, results) => {
          if (error) {
            res.status(500).send(error.message);
          } else {
            res.status(201).send("User added successfully");
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
  
  const deleteUser = async (req, res) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      const { id } = req.params;
  
      const query = "DELETE FROM USER WHERE ID = ?";
  
      connection.query(query, [id], (error, results) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(200).send("User deleted successfully");
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
  
  const updateUser = async (req, res) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      const { fname, lname, email, tel } = req.body;
  
      let query = "UPDATE USER SET ";
  
      const params = [];
      if (fname) {
        query += "FNAME = ?, ";
        params.push(fname);
      }
  
      if (lname) {
        query += "SURNAME = ?, ";
        params.push(lname);
      }
  
      if (email) {
        query += "MAIL = ?, ";
        params.push(email);
      }
  
      if (tel) {
        query += "TELEPHONE_NUMBER = ?, ";
        params.push(tel);
      }
  
      query = query.slice(0, -2);
      query += " WHERE ID = ?"; 
      params.push(req.params.id); 
  
      connection.query(query, params, (error, results) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(200).send("User updated successfully");
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
  
  const getUserFiltered = async (req, res) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      const { fname, lname, email, tel } = req.body;
  
      let query = "SELECT * FROM USER WHERE 1=1 ";
      const params = [];
  
      if (fname) {
        query += "AND FNAME LIKE ? ";
        params.push('%' + fname + '%');
      }
  
      if (lname) {
        query += "AND SURNAME LIKE ? ";
        params.push('%' + lname + '%');
      }
  
      if (email) {
        query += "AND MAIL LIKE ? ";
        params.push('%' + email + '%');
      }
  
      if (tel) {
        query += "AND TELEPHONE_NUMBER LIKE ? ";
        params.push('%' + tel + '%');
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
    addUser,
    deleteUser,
    updateUser,
    getUserFiltered,
  };