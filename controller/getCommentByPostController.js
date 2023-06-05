require("express-async-errors");
const {Sequelize}= require("sequelize");
const Post = require("../models/post");
const Comment = require('../models/comments');
const validationError = require("../errors/validationError");
const {StatusCodes} = require("http-status-codes");
const User = require("../models/users");
exports.getCommentByPostController = async(req,res,next)=>{
    if(req.query.username){
        const comment = await Comment.findAll({
            where:{
                commentBy:req.query.username
            },
            attributes:["commentBy","text","createdAt"],
            include:{
                model:Post,
                attributes:["s3URI","caption"],
                required:true,
                where:{
                    id: req.params.postid
                },
                include:{
                    model:User,
                    attributes:["username","email"],
                    required:true
                }
            }
        });
        return res.status(StatusCodes.OK).json({comment});
    }
    const comment = await Comment.findAll({
        attributes:["commentBy","text","createdAt"],
        where:{
            post: req.params.postid
        },
        include:{
            model:Post,
            attributes:["s3URI","caption"],
            required:true
        }
    });
    console.log("comments are \n");
    console.log(comment);
    res.status(StatusCodes.OK).json({comment});
}