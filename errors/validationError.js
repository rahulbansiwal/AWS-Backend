


class ValidationError extends Error{
    constructor(statusCode,errorType,message){
        super(message);
        this.code = statusCode;
        this.type = errorType; 
    }
};

module.exports = ValidationError;
