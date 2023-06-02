const  ValidationError = require('../errors/validationError');
const {StatusCodes} = require('http-status-codes')
const validator = require("validator");
const User = require('../models/users');
require('express-async-errors');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../utils/env');


exports.updateUserController = async (req,res,next)=>{

    if(!req.params.username){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"username is missing in the URL","missing username in URL");
    }
    const username = req.params.username;
    if(!req.headers.authorization){
        throw new ValidationError(StatusCodes.UNAUTHORIZED,"token is not passed","JWT token not supplied");
    }
    const token = req.headers.authorization.split(" ");
    if(token[0] != "Bearer"){
        throw new ValidationError(StatusCodes.UNAUTHORIZED,"token type is not valid","token type is not Bearer");
    }
    const verify = jwt.verify(token[1],JWT_SECRET);
    if( verify.user != username){
        throw new ValidationError(StatusCodes.UNAUTHORIZED,"token is not valid for the user","invalid token with the user");
    }

    let change;
    switch(req.query.change){
        case "username":
        change = "username"
        break;
        case "password":
            change = "password"
            break;
        case "first_name":
            change = "first_name"
            break;
        case "last_name":
            change = "last_name"
            break;
        case "email":
            change="email"
            break;
        default :
            change = "username"
            break; 
    }
    
    if(!req.body[change]){
        throw new ValidationError(StatusCodes.BAD_REQUEST,`${change} is missing from request body`,"request body is not valid for update")
    }
    if(change =="password"&&!(validator.isUppercase(req.body[change]) && validator.isLowercase(req.body[change]) && validator.isLength(req.body[change],{min:6,max:12}))){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"password requiremnt are not meet","password too weak");
    }
    if(change == "username"){
        const user = await User.findByPk(req.body[change]);
        if(user){
            throw new ValidationError(StatusCodes.NOT_ACCEPTABLE,`username ${req.body[change]} is already taken`,"updated username is already taken");
        }
    }
    let user = await User.findByPk(username);
    if(!user){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"invalid username","invalid username");

    }
    console.log({[change]:req.body[change]});
    user = await User.update({[change]:req.body[change]},{
        where:{
            username
        }
    })
    console.log(user);
    if(!user){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"invalid values","invalid values");
    }
    res.status(StatusCodes.OK).json({
        message:`value updated for ${change}`
    });
}