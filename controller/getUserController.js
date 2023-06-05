require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/users");
const ValidationError = require('../errors/validationError');
exports.getUserController = async(req,res,next)=>{
    const users = await User.findAll();
    if(!users){
        throw new ValidationError(StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong!");
    }
    let i = [];
    const response = users.forEach(user=>{
        i.push({username:user.dataValues.username,email:user.dataValues.email}) 
    })
    console.log(i);
    res.status(StatusCodes.OK).json({
        users: i
    })
}