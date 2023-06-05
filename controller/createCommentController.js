require('express-async-errors');
const Post = require('../models/post');
const Comment = require('../models/comments');
const ValidationError = require('../errors/validationError');
const {StatusCodes} = require('http-status-codes'); 

exports.createCommentController = async(req,res,next)=>{
    if(!req.body.comment){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"comment is missing from req body","comment is not provided");
    }
    const postid = await Post.findByPk(req.params.postid);
    if(!postid){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"post not found","postid not available in DB");
    }
    const comment = await Comment.create({
        commentBy : req.user,
        text: req.body.comment,
        post: req.params.postid
    });
    if(!comment){
        throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong!","comment is not inserted in the DB");
    }
    res.status(StatusCodes.OK).json({
        commentId: comment.dataValues.id,
        commentBy: comment.dataValues.commentBy,
        post: postid
    });
}