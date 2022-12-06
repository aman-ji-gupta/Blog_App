const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    userID :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    blog_pic:{
        type:String,
        require:true
    },
    likes:{
        type:Number,
        require:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
})

blogSchema.set('timestamps',true);
module.exports=mongoose.model("blog",blogSchema)
