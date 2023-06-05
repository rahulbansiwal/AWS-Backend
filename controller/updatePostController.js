require('express-async-errors');
const ValidationError = require('../errors/validationError');
const jwt = require('jsonwebtoken');
const {JWT_SECRET}= require('../utils/env');
const { StatusCodes } = require('http-status-codes');
const Post = require('../models/post');
const updateposts3 = require("./updatepostAWS-S3");
const { uploadfile } = require('./uploadpostAWS-S3');

exports.updatePostController = async(req,res,next)=>{
    const username = req.user;
    const postid = req.params.postid;
    const post = await Post.findByPk(postid);
    //console.log(post);
    if(!post){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"Not able to find any post for the provided postid","no post exisit for the provided postid");
    }
    console.log(req.body);
    if(req.body.caption){
        const post = await Post.update({caption:req.body.caption},{
            where:{
                id:postid
            }
        });
        if(!post){
            throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong",post);
        }
    }
    console.log(req.headers["content-type"].split(";")[0]);
    if(req.headers["content-type"].split(";")[0] =="multipart/form-data"){
        console.log('entering file upload');
        next();

    }
    next();
    
}