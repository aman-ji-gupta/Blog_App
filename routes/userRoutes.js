
const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const validation = require("../validation/user/userValidation");
const {upload} = require("../middleware/imageStorage")
router.post('/register',upload.single("profilepic"),validation.registerUserValidation ,user.userSignup);

module.exports=router;
