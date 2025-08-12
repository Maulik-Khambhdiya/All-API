const mongoose= require('mongoose');
 const markSchema= mongoose.Schema({
    name:{
        type:mongoose.Types.ObjectId,
        ref:"students", // from student model
        required:[true,"Enter Name"]
    },

    s1:{
        type:Number,
        required:[true,"Enter Subject1 Marks"]
    },
     s2:{
        type:Number,
        required:[true,"Enter Subject2 Marks"]
    },
     s3:{
        type:Number,
        required:[true,"Enter Subject3 Marks"]
    },
 })

module.exports=mongoose.model("marks",markSchema)