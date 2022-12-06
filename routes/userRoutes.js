
const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const validation = require("../validation/user/userValidation");

router.post('/register',validation.registerUserValidation ,user.userSignup);

module.exports=router;
