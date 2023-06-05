require('express-async-errors');
const { StatusCodes } = require('http-status-codes');
const ValidationError = require('../errors/validationError');
const Post = require('../models/post');

exports.likepostController = async(req,res,next)=>{
    console.log("res user \n"+req.user);
    const postid = req.params.postid;
    const post = await Post.findByPk(postid);
    console.log(post)
    if(!post){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"no post for the provided postid","post is not valid");
    }
    const like = parseInt(post.dataValues.likes +1);
    console.log(like);
    console.log(req.query);
    if(req.query.dislike=="true"){
       return res.status(StatusCodes.OK).json({dislike:true});
    }
    const updatedpost = await Post.update({likes:like},{
        where:{
            id:postid
        }
    });
    console.log(updatedpost[0]);
    if(!updatedpost[0]){
        throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,"soemthing went wrong","like updates failed");
    }
    res.status(StatusCodes.OK).json({
        updatedpost
    });
}