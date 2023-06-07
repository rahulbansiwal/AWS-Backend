const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const loginRouter = require('./routes/loginRoutes');
const signupRouter = require('./routes/signupRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const {StatusCodes} =  require('http-status-codes');
//const dbconnect = require('./utils/dbconnect');
const {errorHandler} = require('./middlewares/errorHandler');
const {PORT_NUMBER} = require('./utils/env');
const expresswinston = require("express-winston");
const {expresslogger,expressErrorLogger}= require("./errors/loggingerror");


/*TO DO
dockerize the app -- MONOLITHIC
dockerize the app -- MICROSERVICES
Add redis cache
*/


app.use(helmet());
app.use(bodyParser.json());

app.use(expresswinston.logger({
    winstonInstance: expresslogger,
    statusLevels:true,
    requestFilter: function(req,propname){
        if(propname =="method" || propname =="httpVersion"){
            return req[propname];
        }
    },
    responseFilter: function(res,propname){
        if(propname=="statusCode"){
            return res[propname];
        }
    }
}));

app.use('/signup',signupRouter);
app.use('/user',loginRouter);
app.use('/post',postRouter);
app.use('/comment',commentRouter);


app.use(expresswinston.errorLogger({
    winstonInstance:expressErrorLogger,
    statusLevels:true

}));
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