const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const HospitalAdmin = require("../models/hospitalAdminModel");
const Doctor = require("../models/doctorModel.js");
const Patient = require("../models/patientModel");
const dotenv = require("dotenv");
dotenv.config({
  path: "../.env", //give .env file location
});

const requireAuth = (userType) => async (req, res, next) => {
  const token = req.header("auth-token");
  if (token) {
    jwt.verify(token, process.env.AUTH_KEY, async (err, decodedToken) => {
      if (err) {
        let AuthError = { error: `${userType} is not authenticated!` };
        res.status(401).send({ AuthError });
      } else {
        let user;
        switch (userType) {
          case "admin":
            console.log(decodedToken.id);
            user = await Admin.getByUserId(decodedToken.id);
            console.log(user);
            break;
          case "hospitalAdmin":
            user = await HospitalAdmin.findById(decodedToken.id);
            break;
          case "doctor":
            user = await Doctor.findByUserId(decodedToken.id);
            break;
          case "patient":
            user = await Patient.findById(decodedToken.id);
            break;
          default:
            throw new Error("Invalid user type!");
        }
        if (!user) {
          let AuthError = { error: `${userType} not found!` };
          res.status(401).send({ AuthError });
        } else {
          req.user = user;
          next();
        }
      }
    });
  } else {
    let AuthError = { error: `${userType} is not authenticated!` };
    res.status(401).send({ AuthError });
  }
};

module.exports = requireAuth;
