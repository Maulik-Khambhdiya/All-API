const express = require("express");
const studentApi = express.Router();
let AC = require("../controller/student");
const AM = require("../middleware/auth");

studentApi.post("/", AC.addData);
studentApi.get("/",AM.authCheck, AC.viewData);
studentApi.delete("/:id", AM.authCheck, AC.deleteData);
studentApi.patch("/:id", AM.authCheck, AC.editData);

module.exports = studentApi;
