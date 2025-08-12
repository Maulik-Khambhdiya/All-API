const express = require("express");
const markApi = express.Router();
let AC = require("../controller/studentMark");
let AM = require("../middleware/auth");

markApi.post("/", AC.createData);
markApi.get("/", AM.authCheck, AC.viewData);
markApi.delete("/:id", AM.authCheck, AC.deleteData);
markApi.patch("/:id", AM.authCheck, AC.editData);

module.exports = markApi;
