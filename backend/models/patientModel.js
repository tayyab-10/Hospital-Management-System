const { getData } = require("../db/db");
const User = require("../models/userModel");
const Person = require("../models/personModel");
const sql = require("mssql");
const { executeQuery } = require("./genericModel");

const Patient = {
  async findById(id, transaction) {
    try {
      const query = "SELECT * FROM Patient WHERE PersonID = @id";
      const parameters = [{ name: "id", type: sql.Int, value: id }];
      const result = await executeQuery(query, parameters, transaction);
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log("Error finding patient", err);
      throw err;
    }
  },

  async findPatientSymptomById(patientID, transaction) {
    try {
      const query =
        "SELECT * FROM PatientSymptoms WHERE PatientID = @patientID";
      const parameters = [
        { name: "patientID", type: sql.Int, value: patientID },
      ];
      const result = await executeQuery(query, parameters, transaction);
      return result;
    } catch (error) {
      console.log("Error finding patient symptoms", error);
      throw error;
    }
  },
  async getAllPatients(id) {
    const query = `SELECT CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name],Person.Contact,Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Person.Gender,Patient.MedicalHistory, PatientSymptoms.Description, DoctorPatientVisit.DateAssigned AS [Visit Date] FROM Patient JOIN Person ON Patient.PersonID = Person.PersonID JOIN DoctorPatientVisit ON DoctorPatientVisit.PatientID = Patient.PatientID JOIN Doctor ON Doctor.DoctorID = DoctorPatientVisit.DoctorID JOIN PatientSymptoms ON PatientSymptoms.PatientID= Patient.PatientId Where Doctor.DoctorID=@id ;
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
    description,
    aliveStatus,
    medicalHistory
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
      // console.log(person.PersonID, aliveStatus, medicalHistory);
      const patient = await this.insertPatient(
        person.PersonID,
        aliveStatus,
        medicalHistory,
        transaction
      );
      console.log(patient);

      const patientSymptoms = await this.insertPatientSymptoms(
        patient.PatientID,
        description,
        transaction
      );
      const personid = patient.PersonID;
      const patientid = patient.PatientID;
      const symptomsId = patientSymptoms.SymptomsID;
      const query =
        "SELECT Users.UserName, Users.UserID, Person.Email, CONCAT (Person.FirstName,' ',Person.LastName) AS Name, Patient.MedicalHistory, Patient.AliveStatus,PatientSymptoms.Description AS Symptoms FROM Patient JOIN Person ON Person.PersonId = @personid JOIN Users ON Users.UserID = @userId LEFT JOIN PatientSymptoms ON PatientSymptoms.PatientID = @patientId WHERE Patient.PatientID=@patientid AND PatientSymptoms.PatientID=@patientid";
      const parameters = [
        { name: "personid", type: sql.Int, value: personid },
        { name: "userId", type: sql.Int, value: userId },
        { name: "patientId", type: sql.Int, value: patientid },
      ];
      const result = await executeQuery(query, parameters, transaction);
      await transaction.commit();
      return result != null && result.length > 0 ? result[0] : null;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  },

  async insertPatient(personID, aliveStatus, medicalHistory, transaction) {
    try {
      const query =
        "INSERT INTO Patient (PersonID,AliveStatus,MedicalHistory) VALUES (@personID,@aliveStatus,@medicalHistory)";
      const parameters = [
        { name: "personID", type: sql.Int, value: personID },
        { name: "aliveStatus", type: sql.Int, value: aliveStatus },
        { name: "medicalHistory", type: sql.VarChar, value: medicalHistory },
      ];
      await executeQuery(query, parameters, transaction);
      const result = await this.findById(personID, transaction);
      console.log(result);
      return result;
    } catch (error) {
      console.log("Error inserting patient into database", error);
      throw error;
    }
  },

  async insertPatientSymptoms(patientID, description, transaction) {
    try {
      const query =
        "INSERT INTO PatientSymptoms (PatientID,Description,DateRecorded) VALUES (@patientID,@description,SYSDATETIME())";
      const parameters = [
        { name: "patientID", type: sql.Int, value: patientID },
        { name: "description", type: sql.VarChar, value: description },
      ];
      await executeQuery(query, parameters, transaction);
      const result = await this.findPatientSymptomById(patientID, transaction);
      return result;
    } catch (error) {
      console.log("Error inserting patient symptoms into database", error);
      throw error;
    }
  },
};

module.exports = Patient;
