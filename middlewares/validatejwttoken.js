require('express-async-errors');
const ValidationError = require('../errors/validationError');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/users');
const {JWT_SECRET}= require('../utils/env');
const jwt = require('jsonwebtoken');
const  {applicationlogs}= require('../errors/loggingerror');

exports.validatejwttoken = async(req,res,next)=>{
    if(!req.headers.authorization){
        applicationlogs.log("error","JWT token is not passed");
         throw new ValidationError(StatusCodes.UNAUTHORIZED,"token is not passed","JWT token not supplied");

    }
    const token = req.headers.authorization.split(" ");
    if(token[0] != "Bearer"){
        applicationlogs.log("error","token type is not valid");
        throw new ValidationError(StatusCodes.UNAUTHORIZED,"token type is not valid","token type is not Bearer");
    }
    const verify = jwt.verify(token[1],JWT_SECRET,(err,token)=>{
        if(err){
            applicationlogs.log("error",err.message);
            throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,err,err);
        }
        return token;
    });
    console.log(verify);
    
    if(!verify){
        applicationlogs.log("error","JWT token verification failed");
        throw new ValidationError(StatusCodes.UNAUTHORIZED,"token is not valid for the user","invalid token with the user");
    }
    if(req.params.username){
        if(verify.user != req.params.username){
            applicationlogs.log("error","JWT token not matching with username");
            throw new ValidationError(StatusCodes.UNAUTHORIZED,"unauthorized user","username is not matching with the token.user");
        }
    }
    const user = await User.findByPk(verify.user);
    //console.log(user);
    if(!user){
        applicationlogs.log("error","user is not found in DB");
        throw new ValidationError(StatusCodes.UNAUTHORIZED,"authentication failed","user is not found in db");
    }
    req.user= user.dataValues.username;
    next();
} 