require("express-async-errors");
const Post = require('../models/post');
const {StatusCodes}= require("http-status-codes");
const User = require('../models/users');
const {Sequelize}=require("sequelize");

exports.getPostsController = async(req,res,next)=>{
    let username = req.query.username?req.query.username:req.user;
    console.log(username);
    const post = await Post.findAll({
        attributes:["id","caption","s3URI"],
        include:{
            model:User,
        attributes:["first_name","last_name","username","email"],}});
    //const posts = await User.findAll({where:{createdBy:username},include:Post});
    console.log(post);
    res.status(StatusCodes.OK).json({
        post
    });
}