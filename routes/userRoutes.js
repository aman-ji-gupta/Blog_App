
const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const validation = require("../validation/user/userValidation");
const authorization = require("../middleware/auth_middleware");
const {upload} = require("../middleware/imageStorage")

router.post('/register',upload.single("profilepic"),validation.registerUserValidation ,user.userSignup);
router.post('/login',validation.loginUserValidation ,user.userLogin);
router.post('/send-reset-password-email',authorization.checkUserAuth,user.sendUserResetPasswordEmail);

module.exports=router;
