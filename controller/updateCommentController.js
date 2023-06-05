require('express-async-errors');
const ValidationError = require('../errors/validationError');
const Comment = require('../models/comments');
const {StatusCodes} = require('http-status-codes')


exports.updateCommentController = async(req,res,next)=>{
    const comment = await Comment.findByPk(req.params.commentid);
    if(!comment){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"comment is not found","No comment in the DB");
    }
    if(comment.dataValues.commentBy != req.user){
        throw new ValidationError(StatusCodes.UNAUTHORIZED,"not authorized for the action","userid not matched with createdby");
    }
    if(!req.body.text){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"text is missing from req body","req body is missing text field");
    }
    const result = await Comment.update({
        text: req.body.text
    },{
        where:{
            id: req.params.commentid
        }
    });
    res.status(StatusCodes.OK).json({
        message:"comment updated succesfully",
        result
    });
}
