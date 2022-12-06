const express = require("express");
const router = express.Router()
const userRoutes = require("./userRoutes")
const blogRoutes = require("./blogRoutes")

//router.use('/user',userRoutes);
// router.use('/blog',blogRoutes);

module.exports=router;
