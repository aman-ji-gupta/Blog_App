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

module.exports={
    addBlog
}