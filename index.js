const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRouter = require('./routes/loginRoutes');
const signupRouter = require('./routes/signupRoutes');
const {StatusCodes} =  require('http-status-codes');
const dbconnect = require('./utils/dbconnect');
require('dotenv').config({path:"./config.env"});

app.use(bodyParser.json());



app.use('/login',loginRouter);
app.use('/signup',signupRouter);

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).send({"message": err.message});
})


app.listen(process.env.PORT_NUMBER,(err)=>{
    if(err){
        console.log(err);
    }
        // dbconnect.connect()
        // .then(console.log(`Server is listening on PORT ${process.env.PORT_NUMBER}`))
        // .catch((err)=>{console.log(err)});
        console.log(`Server is listening on PORT ${process.env.PORT_NUMBER}`)   
});