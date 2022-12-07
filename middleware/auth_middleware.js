const jwt = require("jsonwebtoken");
const userSchema = require("../model/userSchema");
const key = require("../controller/userController");

const checkUserAuth = async (req , res , next) =>{
    const {authorization} = req.headers;
    let token;
    if(authorization && authorization.startsWith("Bearer")){
        try{
            //get token from header
            token = authorization.split(" ")[1];
            console.log("Token: ",token);
            console.log("Authorization :",authorization);

            //veryfy token
            const {userID} = jwt.verify(token,key.secretKey);
            
            //get user from token
            req.userSchema = await userSchema.findById(userID).select('-password');
            next();
        }catch(err){
            console.log(err);
            res.status(401).json({
                status : "Failed",
                Message : "Unauthorized User..!"
            })
        }
    }
}

module.exports={
    checkUserAuth
}