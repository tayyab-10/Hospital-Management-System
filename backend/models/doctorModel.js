const sql = require("mssql");
const { getData } = require("../db/db");
const User = require("./userModel");
const Person = require("./personModel");
const { executeQuery } = require("./genericModel");

const Doctor = {
  async findById(id, transaction) {
    const query = "SELECT * FROM Doctor WHERE PersonId = @id";
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters, transaction);
    return result != null && result.length > 0 ? result[0] : null;
  },

  async findByUserId(id) {
    const query =
      "SELECT * FROM Doctor JOIN Person ON Doctor.PersonID = Person.PersonID JOIN Users ON Person.UserID = Users.UserID WHERE Users.UserID = @id";
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result != null && result.length > 0 ? result[0] : null;
  },
  async getAllDoctors(id) {
    const query = `SELECT CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name],Person.Contact,Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Person.Gender ,Doctor.Specialization, Doctor.Experience FROM Doctor JOIN Person ON Doctor.PersonID = Person.PersonID JOIN DoctorDepartmentAssignment ON DoctorDepartmentAssignment.DoctorID = Doctor.DoctorID JOIN Department ON Department.DepartmentID = DoctorDepartmentAssignment.DepartmentID JOIN Hospital ON Hospital.HospitalID =Department.HospitalID   JOIN Admin ON Admin.AdminID = Hospital.AdminID Where Admin.AdminID=@id ;
    `;
    const parameters = [{ name: "id", type: sql.Int, value: id }];
    const result = await executeQuery(query, parameters);
    return result;
  },

  async register(
    username,
    password,
    firstname,
    lastname,
    email,
    gender,
    dateofBirth,
    role,
    qualification,
    specialization,
    experience,
    checkupstatus,
    consulationfee
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
      let personId = person.PersonID;
      const doctor = await this.insertDoctor(
        qualification,
        specialization,
        experience,
        checkupstatus,
        consulationfee,
        personId,
        transaction
      );
      //console.log(doctor);
      let doctorId = doctor.DoctorID;
      const query =
        "SELECT Users.UserName, Users.UserID, Person.Email, CONCAT (Person.FirstName,' ',Person.LastName) AS Name, Doctor.Qualification, Doctor.Specialization, Doctor.Experience, Doctor.CheckupStatus, Doctor.ConsultationFee FROM Doctor JOIN Person ON Person.PersonId = @personid JOIN Users ON Users.UserID = @userId WHERE Doctor.DoctorID=@doctorid";
      const parameters = [
        { name: "personid", type: sql.Int, value: personId },
        { name: "userId", type: sql.Int, value: userId },
        { name: "doctorid", type: sql.Int, value: doctorId },
      ];

      const result = await executeQuery(query, parameters, transaction);
      await transaction.commit();
      return result != null && result.length > 0 ? result : null;
    } catch (error) {
      console.log("Error registering doctor", error);
      await transaction.rollback();
      throw error;
    }
  },

  async insertDoctor(
    qualification,
    specialization,
    experience,
    checkupstatus,
    consulationfee,
    personid,
    transaction
  ) {
    try {
      const query =
        "INSERT INTO Doctor (Qualification,Specialization,Experience,CheckupStatus,ConsultationFee,PersonID) VALUES (@qualification,@specialization,@experience,@checkupstatus,@consulationfee,@personid)";
      const paramters = [
        { name: "qualification", type: sql.VarChar, value: qualification },
        { name: "specialization", type: sql.VarChar, value: specialization },
        { name: "experience", type: sql.Int, value: experience },
        { name: "checkupstatus", type: sql.Int, value: checkupstatus },
        { name: "consulationfee", type: sql.Decimal, value: consulationfee },
        { name: "personid", type: sql.Int, value: personid },
      ];
      await executeQuery(query, paramters, transaction);
      const result = await this.findById(personid, transaction);
      return result;
    } catch (error) {
      console.log("Error inserting doctor into database", error);
      throw error;
    }
  },
};

module.exports = Doctor;
