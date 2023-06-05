require('express-async-errors');
const Post = require("../models/post");
const ValidationError = require('../errors/validationError'); 
const {StatusCodes} = require("http-status-codes");

exports.getPostByIdController = async(req,res,next)=>{
    const postid = req.params.postid;
    const post = await Post.findByPk(postid);
    console.log(post);
    if(!post){
        throw new ValidationError(StatusCodes.NOT_FOUND,"can't find any post with the mentioend postid","no post available for with supplied post id");
    }
    res.status(StatusCodes.OK).json({
        postid,
        caption: post.dataValues.caption,
        s3URI:post.dataValues.s3URI,
        like:post.dataValues.like,
        createdBy:post.dataValues.createdBy
    })
};