const express=require('express')
const markApi=express.Router()
let AC=require('../controller/studentMark')

markApi.post("/", AC.createData);
markApi.get("/", AC.viewData);
markApi.delete("/:id", AC.deleteData);
markApi.patch("/:id", AC.editData);

module.exports=markApi