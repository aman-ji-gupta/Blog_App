const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
}) 

userSchema.set('timestamps',true);
module.exports=mongoose.model("user",userSchema);
