const joi = require("@hapi/joi");
joi.objectId=require('joi-objectid')(joi)

const schema = {
    addBlog : joi.object({
        userID : joi.objectId().required(),
        title :joi.string().min(5).max(25).required(),
        description : joi.string().min(5).max(300).required()
    }).unknown(true)
}

module.exports=schema;
