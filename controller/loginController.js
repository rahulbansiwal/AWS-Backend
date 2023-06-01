const {ENCRYPT_SALT} = require('../utils/env');
const ValidationError = require('../errors/validationError');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../utils/env');
const bcrypt = require('bcrypt');

exports.postLoginController = async (req,res,next)=>{
    const {username,password}=req.body;
    if(!username || !password){
        const error = new ValidationError(StatusCodes.BAD_REQUEST,"invalid input","invalid input");
        next(error);
    }
    const user = await User.findOne({attributes:['username','password'],where:{username}})
    if(!user){
        const error = new ValidationError(StatusCodes.NOT_FOUND,`${username} doesn't exsist`,"user not found!");
            next(error);
    }
    console.log(user);
    const pwdCheck = await bcrypt.compareSync(password,user.password);
    if(!pwdCheck){
         throw new ValidationError(StatusCodes.BAD_REQUEST,`Invalid password`,"invalid password");
            //next(error);
    }

    const token =  await jwt.sign({user:user.dataValues.username},JWT_SECRET,{expiresIn:'1h'},(err)=>{
        if(err){
            console.log(err);
             throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,"Something went wrong!","JWT Token generation failed");
            //next(error);
        }
    });
    res.status(StatusCodes.OK).json({token})
}