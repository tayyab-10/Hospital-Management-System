const { getData } = require("../db/db");
const User = require("../models/userModel");
const Person = require("../models/personModel");
const sql = require("mssql");
const { executeQuery } = require("./genericModel");

// Admin schema definition (similar to Mongoose schema)

// Define a model object for Admin
const Admin = {
  async findById(id, transaction = null) {
    try {
      const query = "SELECT * FROM Admin WHERE PersonID = @id";
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      console.log(result);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log("Error finding admin", err);
      throw err;
    }
  },
  async getAllAdmins() {
    const pool = await getData();
    const result = await pool.query`SELECT * FROM Person Where UserID= ${id}`;
    return result.recordset;
  },

  async getByUserId(id) {
    try {
      const query =
        "SELECT * FROM Admin JOIN Person ON Admin.PersonID = Person.PersonID JOIN Users ON Users.UserID = Person.UserID WHERE Users.UserId = @id";
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log("Error finding admin", err);
      throw err;
    }
  },

  async register(
    username,
    password,
    firstname,
    lastname,
    email,
    dateofBirth,
    gender,
    role
  ) {
    const pool = await getData();
    const transaction = pool.transaction();
    try {
      await transaction.begin();
      const user = await User.insertUser(username, password, role, transaction);
      let userId = user.UserID;

      const person = await Person.insertPerson(
        userId,
        firstname,
        lastname,
        email,
        dateofBirth,
        gender,
        transaction
      );

      const admin = await this.insertAdmin(person.PersonID, transaction);
      console.log(admin);
      let personId = person.PersonID;
      let adminId = admin.AdminID;
      const query =
        "SELECT Users.UserName, Users.UserID, Person.Email, CONCAT (Person.FirstName,' ',Person.LastName) AS Name, Admin.JoinDate FROM Admin JOIN Person ON Person.PersonId = @personId JOIN Users ON Users.UserID = @userId WHERE Admin.AdminID=@adminId";
      const parameters = [
        { name: "personId", type: sql.Int, value: personId },
        { name: "userId", type: sql.Int, value: userId },
        { name: "adminId", type: sql.Int, value: adminId },
      ];
      const result = await executeQuery(query, parameters, transaction);
      await transaction.commit();
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  },

  async insertAdmin(personID, transaction) {
    try {
      const query =
        "INSERT INTO Admin (PersonID,JoinDate) VALUES (@personID,GETDATE())";
      const parameters = [{ name: "personid", type: sql.Int, value: personID }];
      await executeQuery(query, parameters, transaction);
      const res = await this.findById(personID, transaction);
      return res;
    } catch (error) {
      console.log("Error inserting admin into database", error);
      throw error;
    }
  },
};

module.exports = Admin;
