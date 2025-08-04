const mongoose=require('mongoose')

const useSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter Name']
    },
     email:{
        type:String,
        required:[true,'Enter email']
    },
     password:{
        type:String,
        required:[true,'Enter Password']
    },
     profile:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('users',useSchema)