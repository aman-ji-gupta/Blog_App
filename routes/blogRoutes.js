const express = require("express");
const router = express.Router();
const blogSchema = require("../model/blogSchema");
const validation = require("../validation/blog/blogValidation");
const blog = require("../controller/blogController")
const {upload} = require("../middleware/imageStorage");

router.post('/addblog',upload.single("blog_pic"),validation.addBlogValidation,blog.addBlog);
router.get('/find',blog.blogList);

module.exports=router;