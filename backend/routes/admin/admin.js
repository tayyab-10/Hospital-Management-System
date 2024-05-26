const requireAuth = require("../../middlewares/requireAuth");
const { view_doctorlist } = require("../../controllers/fetchList");

const express = require("express");
const route = express.Router();
route.use(express.json());

route.get("/doctorlist", requireAuth("admin"), view_doctorlist);

module.exports = route;
