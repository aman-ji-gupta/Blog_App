const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blog'
    },
    comment:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
})

commentSchema.set('timestamps',true);
module.exports=mongoose.model('comment',commentSchema)
