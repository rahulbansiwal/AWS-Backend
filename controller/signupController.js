const {Op} = require('sequelize');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/users');
const ValidationError = require('../errors/validationError');

exports.postSignupController = async (req,res,next)=>{
    const {username,password,first_name,last_name,email}= req.body;
    if(!username || !password || !first_name || !last_name || !email){
        const error= new ValidationError(StatusCodes.BAD_REQUEST,"invalid Input","Please provide valid input");
        next(error);
    }
    const user = await User.findAll({
        where:{
            [Op.or]:[
                {username},{email}
            ]
        }
    });
    console.log(user);
    if(user){
        const error = new ValidationError(StatusCodes.BAD_REQUEST,`${username} OR ${email} already exsist`,"username is already taken");
        next(error);
    }
    
    try{
        const user = await User.create({username,password,first_name,last_name,email}); 
        res.status(StatusCodes.CREATED).json({"message":"User Created succesfully",username});
        }
        catch(err){
        console.log(err.message);
        const error = new ValidationError(StatusCodes.BAD_REQUEST,"create user failed",err.message);
        next(error)
        }
}