const user = require("./userSchema");

module.exports={
    registerUserValidation : async(req, res, next) => {
        console.log("in validation 2");
        const value = await user.registerUser.validate(req.body, { abortEarly: false });
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
           
        }
    },
    loginUserValidation : async(req, res, next) => {
        console.log("in validation 2");
        const value = await user.loginUser.validate(req.body, { abortEarly: false });
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()      
        }
    },
}