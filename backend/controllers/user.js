const { createToken } = require("../utils/createToken");
const User = require("../models/userModel");
const express = require("express");
const route = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerOnRole } = require("../utils/registerOnRole");
const maxAge = 3 * 24 * 60 * 60;
route.use(express.json());

//For User SignUp

module.exports.signUp = async (req, res) => {
  let success = false;

  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  let result;

  const { username } = req.body;

  try {
    result = await User.userExists(username);
    // Check if user is found
    if (result) {
      res.status(402).json({ success, msg: "User Already Exists" });
    } else {
      const register = await registerOnRole(req.body);
      if (register != null) {
        success = true;
        const token = createToken(register.UserID);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ success, token, msg: "User Added" });
      }

      // result = await User.insertUser(username, securePass, role);
    }
  } catch (err) {
    res.status(400).json({ success, msg: err.message }); // Returning error message
  }
};

// For User Login
module.exports.login = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  const { role } = req.params;
  try {
    // Check if user is found
    const result = await User.findUser(username, role);
    if (result != null) {
      const auth = await User.verifyPassword(result, password);
      if (!auth)
        return res
          .status(400)
          .json({ errors: "Please, Enter Correct Credentials" });
      // console.log(result.UserID);
      const token = createToken(result.UserID);
      success = true;
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ success, token, msg: "User Found", role });
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
};
