const {createLogger,transports,format} = require("winston");
const expresslogger = createLogger({
    transports:[
        new transports.File({
            filename:"./logs/server-info.log",
            level:"info",
            format: format.combine(format.timestamp(),format.json(),format.prettyPrint())
        })
    ]
})
const expressErrorLogger = createLogger({
    transports:[
    new transports.File({
        filename:"./logs/server-error.log",
        level:"error",
        format: format.combine(format.timestamp(),format.json())
    })]
})

const applicationlogs = createLogger({
    transports:[
        new transports.Console({
            level:"info",
            format:format.combine()
        }),
        new transports.File({
            filename :"./logs/application-info.log",
            level:"info",
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename: "./logs/application-errors.log",
            level:"error",
            format: format.combine(format.timestamp(),format.json())
        })
    ]
});




module.exports ={
    applicationlogs,
    expresslogger,
    expressErrorLogger

}