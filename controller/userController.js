const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/userSchema");
const { transporter } = require("../service/mailService");

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
const secretKey = "Aman@1234$"
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

const sendUserResetPasswordEmail = async (req,res) =>{
    const {email} = req.body;
    if(email){
        const emailExists = await userSchema.findOne({email:email});
        if(emailExists){
            const secret = emailExists._id + secretKey;
            //generate JWT
            const token =  jwt.sign(
                {userID : emailExists._id} , secret , {expiresIn:"30d"}
                )
            const link = `http://127.0.0.1:3000/api/user/reset/${emailExists._id}/${token}`;
            console.log("Link: ",link);

            //send email
            console.log('email: ', emailExists.email);
            let info =transporter.sendMail({
                from: "amanguptaeducation@gmail.com",
                to: emailExists.email,
                subject: "password reset link",
                html: ` <a href=${link}> Click here to reset password </a>`
            })

            res.status(200).json({
                status : "Success",
                Message : "please check your email ",info
            })
        }else{
            res.status(404).json({
                status : "Failed",
                Message : "User Not Found..!"
            })
        }
    }else{
        res.status(204).json({
            status : "Failed",
            Message : "Email is required..!"
        })
    }
}

const userPasswordReset = async (req , res) =>{
    const {password,confirm_pass} = req.body;
    const{id,token}=req.params;
    console.log(id);
    console.log(token);
    const user = await userSchema.findById(id);
    const new_secret = user._id + secretKey;
    console.log(new_secret);
    try{
        jwt.verify(token,new_secret);
        if(password && confirm_pass){
            if(password !=confirm_pass){
                res.status(400).send({
                    Status : "Failed",
                    Message : "Password & confirm password should be same..!"
                })
            }else{
                const salt = await bcrypt.genSalt(10);
                const new_password = await bcrypt.hash(password,salt);
                console.log("***" + user._id);
                await userSchema.findByIdAndUpdate(user._id , {$set : {password : new_password}})
            }
            res.status(200).send({
                Status : "Success",
                Message : "Password Reset successfully..!..!"
            })


        }else{
            res.status(204).json({
                Status : "Failed",
                Message : "All Fields are required..!"
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            Status : "Failed",
            Message : err.message
        })
    }
}

module.exports={
    userSignup , userLogin,sendUserResetPasswordEmail,secretKey,userPasswordReset
}