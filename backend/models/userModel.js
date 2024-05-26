const sql = require("mssql");
const bcrypt = require("bcrypt");
const { executeQuery } = require("./genericModel");
const User = {
  async findOne(username, password, role) {
    const query = `SELECT * FROM Users WHERE Username = @username AND Password = @password AND Role = @role`;
    const parameters = [
      { name: "username", type: sql.NVarChar, value: username },
      { name: "password", type: sql.NVarChar, value: password },
      { name: "role", type: sql.Int, value: role },
    ];
    const result = await executeQuery(query, parameters);
    console.log(result);
    return result != null && result.length > 0 ? result[0] : null;
  },

  async userExists(username, transaction = null) {
    try {
      const query = `SELECT * FROM Users WHERE Username = @username`;
      const parameters = [
        { name: "username", type: sql.NVarChar, value: username },
      ];
      const result = await executeQuery(query, parameters, transaction);
      console.log(result);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.error("Error finding user:", err);
      throw err;
    }
  },

  async findUser(username, role) {
    const query = `SELECT * FROM Users WHERE Username = @username AND Role = @role`;
    const parameters = [
      { name: "username", type: sql.NVarChar, value: username },
      { name: "role", type: sql.Int, value: role },
    ];
    const result = await executeQuery(query, parameters);
    return result != null && result.length > 0 ? result[0] : null;
  },

  async insertUser(username, password, role, transaction) {
    try {
      const query =
        "INSERT INTO Users (username, password, role) VALUES (@username, @password, @role)";
      const parameters = [
        { name: "username", type: sql.NVarChar, value: username },
        { name: "password", type: sql.NVarChar, value: password },
        { name: "role", type: sql.Int, value: role },
      ];
      await executeQuery(query, parameters, transaction);
      const result = await this.userExists(username, transaction);
      console.log(result);
      return result;
    } catch (err) {
      console.error("An error occurred while inserting user:", err);
      throw err;
    }
  },
  // Static method to verify admin password
  async verifyPassword(user, password) {
    try {
      if (user) {
        // console.log(user.Password, password);
        const auth = await bcrypt.compare(password, user.Password);
        // console.log(auth);
        if (auth) {
          return user;
        }
        throw new Error("Incorrect Password");
      } else {
        throw new Error("Invalid Email");
      }
    } catch (error) {
      console.error("Error verifying admin password:", error);
      throw error;
    }
  },
};

module.exports = User;
