const sql = require("mssql");
const { getData } = require("../db/db");
const { executeQuery } = require("./genericModel");

const Person = {
  async findById(id, transaction) {
    try {
      const query = "SELECT * FROM Person WHERE UserId = @id";
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.error("Error finding person:", err);
      throw err; // Optionally rethrow the error to be handled by the caller
    }
  },
  async findByEmail(email) {
    try {
      const query = "SELECT * FROM Person WHERE Email = @email";
      const parameters = [{ name: "email", type: sql.NVarChar, value: email }];
      const result = await executeQuery(query, parameters);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.error("Error finding person:", err);
      throw err; // Optionally rethrow the error to be handled by the caller
    }
  },
  async insertPerson(
    userid,
    firstname,
    lastname,
    email,
    dateofbirth,
    gender,
    transaction
  ) {
    try {
      const query =
        "INSERT INTO Person (UserID,FirstName, LastName, Email, DateOfBirth,Gender) VALUES (@userid,@firstname, @lastname, @email, @dateofbirth,@gender);";
      const parameters = [
        { name: "userid", type: sql.Int, value: userid },
        { name: "firstname", type: sql.NVarChar, value: firstname },
        { name: "lastname", type: sql.NVarChar, value: lastname },
        { name: "email", type: sql.NVarChar, value: email },
        { name: "dateofbirth", type: sql.Date, value: dateofbirth },
        { name: "gender", type: sql.Int, value: gender },
      ];
      console.log(parameters);
      await executeQuery(query, parameters, transaction);
      const result = await this.findById(userid, transaction);
      console.log(result);
      return result;
    } catch (error) {
      console.log("Error inserting person into database", error);
      throw error;
    }
  },
};

module.exports = Person;
