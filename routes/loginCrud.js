const express=require('express')
const loginApi=express.Router()

let AC=require('../controller/user')

loginApi.post('/addLoginData',AC.loginUser)


module.exports=loginApi