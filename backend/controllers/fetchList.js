const doctor = require("../models/doctorModel");
const patient = require("../models/patientModel");

const view_doctorlist = async (req, res) => {
  try {
    const { AdminID } = req.user;
    const doctors = await doctor.getAllDoctors(AdminID);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const view_patients = async (req, res) => {
  try {
    const { DoctorID } = req.user;
    const patients = await patient.getAllPatients(DoctorID);
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { view_doctorlist, view_patients };
