const express =require("express");
const router=express.Router();
const userRouter = require("./userRoutes");
const blogRoutes = require("./blogRoutes")

router.use('/user',userRouter)
// router.use('/blog',blogRoutes);

module.exports=router;
