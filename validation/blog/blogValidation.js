const blog = require("./blogSchema");

module.exports = {
    addBlogValidation : async(req , res , next) =>{
        const value = await blog.addBlog.validate(req.body , {AbortEarly : false});
        if(value.error){
            res.json({
                Status : "Failed",
                Message : value.error.details[0].message
            })
        }else{
            next()
        }
    }
}