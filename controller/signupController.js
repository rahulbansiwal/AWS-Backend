const {StatusCodes} = require('http-status-codes');

exports.postSignupController = (req,res,next)=>{
    const {username,password}= req.body;
    if(!username || !password){
        throw new Error('password or username is not provided!');
    }
     res.status(StatusCodes.OK).json({username,"message":"user created succesfully"});
}