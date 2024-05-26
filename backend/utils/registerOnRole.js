const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;
const admin = require("../models/adminModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
// module.exports.registerOnRole = async (param) => {
//   const salt = await bcrypt.genSalt(10);
//   const securePass = await bcrypt.hash(param.password, salt);
//   if (param.role == 1) {
//     return await admin.register(
//       param.username,
//       securePass,
//       param.firstname,
//       param.lastname,
//       param.email,
//       param.dateofBirth,
//       param.role
//     );
//   }
// };

// module.exports.registerOnRole = async (param) => {
//   try {
//     if (!param || typeof param !== "object") {
//       throw new Error("Invalid input parameters");
//     }

//     const { role } = param;

//     if (!role) {
//       throw new Error("Role is required");
//     }

//     let requiredParams = [];
//     switch (role) {
//       case 1: // Main Admin
//         requiredParams = [
//           "username",
//           "password",
//           "role",
//           "firstname",
//           "lastname",
//           "email",
//           "dateOfBirth",
//           "gender",
//         ];
//         break;
//       // Add cases for other roles with their respective required parameters
//       default:
//         throw new Error("Invalid role");
//     }

//     // // Check if all required parameters are provided
//     // const missingParams = requiredParams.filter((param) => !param[param]);
//     // console.log(missingParams);
//     // if (missingParams.length > 0) {
//     //   throw new Error(
//     //     `Missing required parameters: ${missingParams.join(", ")}`
//     //   );
//     // }

//     // Generate a salt and hash the password
//     const salt = await bcrypt.genSalt(10);
//     const securePass = await bcrypt.hash(param.password, salt);

//     // Register user based on role
//     if (role === 1) {
//       return await admin.register(
//         param.username,
//         securePass,
//         param.firstname,
//         param.lastname,
//         param.email,
//         param.dateOfBirth,
//         param.gender,
//         role
//       );
//     }
//     // Add cases for other roles as needed
//   } catch (error) {
//     console.error("Error in registration:", error.message);
//     throw error;
//   }
// };

module.exports.registerOnRole = async (param) => {
  try {
    if (!param || typeof param !== "object") {
      throw new Error("Invalid input parameters");
    }

    const { role } = param;
    console.log(role);
    if (!role) {
      throw new Error("Role is required");
    }

    switch (role) {
      case 1: // Main Admin
        return registerMainAdmin(param);
      case 3: // Doctor
        return registerDoctor(param);
      case 4: // Patient
        return registerPatient(param);
      // Add cases for other roles with their respective functions

      default:
        throw new Error("Invalid role");
    }
  } catch (error) {
    console.error("Error in registration:", error.message);
    throw error;
  }
};

async function registerMainAdmin(param) {
  const requiredParams = [
    "username",
    "password",
    "firstname",
    "lastname",
    "email",
    "dateofBirth",
    "gender",
  ];
  checkRequiredParams(param, requiredParams);

  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(param.password, salt);

  return await admin.register(
    param.username,
    securePass,
    param.firstname,
    param.lastname,
    param.email,
    param.dateofBirth,
    param.gender,
    param.role
  );
}

async function registerPatient(param) {
  const requiredParams = [
    "username",
    "password",
    "firstname",
    "lastname",
    "email",
    "dateofBirth",
    "gender",
    "role",
    "description",
    "aliveStatus",
    "medicalHistory",
  ];
  console.log(param);
  checkRequiredParams(param, requiredParams);
  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(param.password, salt);

  return await Patient.register(
    param.username,
    securePass,
    param.firstname,
    param.lastname,
    param.email,
    param.gender,
    param.dateofBirth,
    param.role,
    param.description,
    param.aliveStatus,
    param.medicalHistory
  );
}
async function registerDoctor(param) {
  const requiredParams = [
    "username",
    "password",
    "firstname",
    "lastname",
    "email",
    "dateofBirth",
    "gender",
    "role",
    "qualification",
    "specialization",
    "experience",
    "checkupstatus",
    "consulationfee",
  ];
  checkRequiredParams(param, requiredParams);
  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(param.password, salt);

  return await Doctor.register(
    param.username,
    securePass,
    param.firstname,
    param.lastname,
    param.email,
    param.gender,
    param.dateofBirth,
    param.role,
    param.qualification,
    param.specialization,
    param.experience,
    param.checkupstatus,
    param.consulationfee
  );
}

function checkRequiredParams(param, requiredParams) {
  const missingParams = requiredParams.filter((key) => !param[key]);
  if (missingParams.length > 0) {
    throw new Error(`Missing required parameters: ${missingParams.join(", ")}`);
  }
}
