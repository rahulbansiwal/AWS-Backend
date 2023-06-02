exports.errorHandler = (err,req,res,next)=>{
    console.log("error is \n"+err);
    let code =  err.code? err.code:500;
    let type = err.type? err.type : err.message; 
    res.status(code).send({"type":type});
};