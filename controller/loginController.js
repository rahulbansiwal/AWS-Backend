const {ENCRYPT_SALT} = require('../utils/env');
const ValidationError = require('../errors/validationError');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../utils/env');
const bcrypt = require('bcrypt');
require('express-async-errors');


exports.postLoginController = async (req,res,next)=>{
    const {username,password}=req.body;
    if(!username || !password){
        throw new ValidationError(StatusCodes.BAD_REQUEST,"invalid input","invalid input");
    }
    const user = await User.findByPk(username);
    if(!user){
        throw new ValidationError(StatusCodes.NOT_FOUND,`${username} doesn't exsist`,"user not found!");
    }
    const pwdCheck = await bcrypt.compareSync(password,user.password);
    console.log(pwdCheck);
    if(!pwdCheck){
        throw new ValidationError(StatusCodes.BAD_REQUEST,`Invalid password`,"invalid password");
    }
    const token =  await jwt.sign({user:user.dataValues.username},JWT_SECRET,{expiresIn:'1h'});
    if(!token){
        throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,"soemthing went wrong!","JWT token generation failed!");
    }
    res.status(StatusCodes.OK).json({token});
}