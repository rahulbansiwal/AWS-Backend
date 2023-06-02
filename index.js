const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRouter = require('./routes/loginRoutes');
const signupRouter = require('./routes/signupRoutes');
const {StatusCodes} =  require('http-status-codes');
//const dbconnect = require('./utils/dbconnect');
const {errorHandler} = require('./middlewares/errorHandler');
const {PORT_NUMBER} = require('./utils/env');


app.use(bodyParser.json());
app.use('/signup',signupRouter);
app.use('/user',loginRouter);




app.use(errorHandler);
app.listen(process.env.PORT_NUMBER,(err)=>{
    if(err){
        console.log(err);
    }
        // dbconnect.connect()
        // .then(console.log(`Server is listening on PORT ${process.env.PORT_NUMBER}`))
        // .catch((err)=>{console.log(err)});
        console.log(`Server is listening on PORT ${PORT_NUMBER}`)   
});