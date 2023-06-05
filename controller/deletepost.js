const jwt= require('jsonwebtoken');
const {JWT_SECRET,AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,REGION,BUCKET_NAME} = require('../utils/env');
require('express-async-errors');
const ValidationError = require('../errors/validationError'); 
const {StatusCodes} = require('http-status-codes'); 
const Post = require('../models/post');
const {S3Client,DeleteObjectCommand} = require('@aws-sdk/client-s3');

exports.deletePost = async(req,res,next)=>{
    const client = new S3Client(AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,REGION);
    const command = new DeleteObjectCommand({
        Bucket:BUCKET_NAME,
        Key: req.params.postid
    });

    
    const response = await client.send(command);
    console.log({...response});
    if(response.$metadata.httpStatusCode != 204 ||!response.$metadata.httpStatusCode){
        throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong",response);
    }
    const post = await Post.destroy({
        where:{
            id:req.params.postid
        }
    });
    console.log(post);
    if(!post){
        throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,post,post);
    } 
    res.status(StatusCodes.OK).json({
        post,
        message:"deleted succesfully"
    });
}