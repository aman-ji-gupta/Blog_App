const blogSchema = require("../model/blogSchema");

const addBlog = async (req , res) =>{
  const blogData = new blogSchema(req.body);
    try{
        const addRes = await blogData.save();
        res.status(200).json({
            status : "Success",
            Message : "Blog Added Successfully..!"
        })

    }catch(err){
        console.log(err);
        res.status(400).json({
            Status : "Failed",
            Message : err.Message
        })
    }
}

const blogList = async (req , res) =>{
    try{
        const count =await blogSchema.find().countDocuments();
        const blogs = await blogSchema.find({},{title:1,description:1,likes:1,blog_pic:1,_id:0})
        res.json({
            count,blogs
        })
    }catch(err){
        res.status(400).json({
            Status : "Failed",
            Message : err.message
        })
    }
}

module.exports={
    addBlog,blogList
}