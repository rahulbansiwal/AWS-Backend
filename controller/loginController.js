


exports.postLoginController = (req,res,next)=>{
    //console.log(req.params);
    //console.log(req.query);
    const {username,password}=req.body;
    console.log(!username ||!password);
    if(!username || !password){
        throw new Error("password and username is not provided");
    }
    else{
        res.status(200).json({"login":"WIP"});
    }
}