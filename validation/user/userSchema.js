const joi = require("@hapi/joi")

const Schema = {
    registerUser : joi.object({
        name : joi.string().max(20).required(),
        email : joi.string().min(8).required(),
        password : joi.string().min(6).required(),
        city : joi.string().min(2).required(),
        state : joi.string().required()
    }).unknown(true),

    loginUser : joi.object({
        email : joi.string().min(8).required(),
        password : joi.string().min(6).required(),
    }).unknown(true),
}

module.exports=Schema;
