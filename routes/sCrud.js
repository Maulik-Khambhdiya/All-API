const express = require("express");
const studentApi = express.Router();
let AC = require("../controller/student");

studentApi.post("/", AC.addData);
studentApi.get("/", AC.viewData);
studentApi.delete("/:id", AC.deleteData);
studentApi.patch("/:id", AC.editData);

module.exports = studentApi;
