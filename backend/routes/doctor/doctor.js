const requireAuth = require("../../middlewares/requireAuth");
const { view_patients } = require("../../controllers/fetchList");

const express = require("express");
const route = express.Router();
route.use(express.json());

route.get("/patientlist", requireAuth("doctor"), view_patients);

module.exports = route;
