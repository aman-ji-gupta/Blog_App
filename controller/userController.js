const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/userSchema");

const userSignup = async (req , res)=>{
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
        const filePath = `/uploads/${req.file.filename}`;
        new_user.profilepic = filePath;
        const addUser = await new_user.save();
        res.json(addUser);
    }catch (err) {
        res.send("Error" + err.message)
    }
}
const  secretKey = "Aman@1234$";
const userLogin = async (req , res) =>{
    let {email,password} = req.body;
    try{
        if(email && password){
            const user = await userSchema.findOne({email:email});
            if(user !=null){
                
                const isPassMatch = await bcrypt.compare(password,user.password);
                if(user.email == email && isPassMatch){
                    const token = jwt.sign(
                        {userID : user._id},secretKey , {expiresIn : "5d"} )
                        res.status(200).json({
                            status : "Success",
                            Message : "Login Succssfully..!",
                            token : token
                        })    
                    }
                  
            }else{
                res.status(401).json({
                    Status : "Failed",
                    Message : "Unauthorized user..!"
                })
            }
        }else{
            res.status(204).json({
                Status : "Failed",
                Message : "Fields can't be empty"
            })
        }



    }catch(err){
        res.json({
            Status : "Failed",
            Message : err.message
        })
    }
}

module.exports={
    userSignup , userLogin,secretKey
}