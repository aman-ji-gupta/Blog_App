const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/userSchema");

const userSignup = async (req , res)=>{
    console.log("aa gya");
    let {email , password} = req.body;
    const userData = new userSchema(req.body);
    const new_user = new userSchema(req.body);
    try{
        const userExits = await userSchema.findOne({email:email});
        if(userExits){
            return res.status(400).json({
                status:"failed",
                Error:"Email already exists...!"
            })
        }
        const salt = await bcrypt.genSalt(10);
        new_user.password = await bcrypt.hash(password,salt);
        const addUser = await new_user.save();
        res.json(addUser);
    }catch (err) {
        res.send("Error" + err.message)
    }
}

module.exports={
    userSignup
}