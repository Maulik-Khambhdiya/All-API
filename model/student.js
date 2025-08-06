const mongoose=require('mongoose')

const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter Name']
    }
})


module.exports=mongoose.model("students",studentSchema)