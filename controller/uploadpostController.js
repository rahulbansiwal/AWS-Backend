require('express-async-errors');
const Post = require("../models/post");
const {StatusCodes} =require('http-status-codes')
const ValidationError = require('../errors/validationError');

exports.uploadPostController = async(req,res,next)=>{
    const {caption} = req.body
    const post = await Post.create({
        id: req.file.key,
        caption,
        createdBy:req.params.username,
        s3URI:req.file.location
    });
    console.log(post);
    if(!post){
        throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong!",post);
    }
    res.status(StatusCodes.CREATED).json({
        postid:post.dataValues.id,
        caption: post.dataValues.caption,
        createdBy:post.dataValues.createdBy,
        s3uri: post.dataValues.s3URI
    })
};