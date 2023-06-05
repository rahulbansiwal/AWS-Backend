require('express-async-errors');
const Comment = require('../models/comments');
const ValidationError =  require('../errors/validationError');
const {StatusCodes}= require('http-status-codes');



exports.deleteCommentController = async(req,res,next)=>{
    const comment = await Comment.findByPk(req.params.commentid);
    if(!comment){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"comment is invalid","no comment found in DB");
    }
    if(comment.dataValues.commentBy != req.user){
        throw new ValidationError(StatusCodes.UNAUTHORIZED,"not authorized to perform this action","not authorized");
    }
    const result = await Comment.destroy({
        where:{
            id:req.params.commentid
        }
    });
    if(!result){
        throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong","db error");
    }
    res.status(StatusCodes.OK).json({
        message:"deleted succesfully",
        result
    });
}