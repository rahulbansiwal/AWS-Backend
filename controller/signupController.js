const {Op} = require('sequelize');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/users');
const ValidationError = require('../errors/validationError');
require('express-async-errors');
const validator = require('validator');

exports.postSignupController = async (req,res,next)=>{
    const {username,password,first_name,last_name,email}= req.body;
    console.log(validator.isUppercase(password));
    console.log(validator.isLowercase(password));
    console.log(validator.isLength(password,{min:6,max:12}))
    if(!(!validator.isUppercase(password) && !validator.isLowercase(password) && validator.isLength(password,{min:6,max:12}))){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"password doesn't meet the requirment","password validation failed");
    }
    if(!username || !password || !first_name || !last_name || !email){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"invalid Input","Please provide valid input");
    }
    let user = await User.findOne({
        where:{
            [Op.or]:[
                {username},{email}
            ]
        }
    });
    if(user){
        throw new ValidationError(StatusCodes.BAD_REQUEST,`${username} OR ${email} already exsist`,"username is already taken");
    }
    

    user = await User.create({username,password,first_name,last_name,email}); 
    console.log(user);
        if(!user){
            throw new ValidationError(StatusCodes.BAD_REQUEST,"create user failed",err.message);
            }
        res.status(StatusCodes.CREATED).json({"message":"User Created succesfully",username});
        
}