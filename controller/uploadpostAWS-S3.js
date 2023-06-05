require("express-async-errors");
const multer = require('multer');
const multerS3 = require('multer-s3'); 
const ValidationError = require('../errors/validationError');
const {StatusCodes} = require('http-status-codes');
const {S3Client} = require('@aws-sdk/client-s3');

const {AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,REGION,BUCKET_NAME} = require('../utils/env');
const client = new S3Client({AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,REGION});

exports.uploadfile = multer({
    storage: multerS3({
        s3:client,
        bucket:BUCKET_NAME,
        metadata: function(req,file,cb){
            console.log(file);
            cb(null,{fieldname:file.originalname,username:req.params.username})
        },
        key:function(req,file,cb){
            cb(null, req.params.username+Date.now().toString())
        }
    }),
    fileFilter: function(req,file,cb){
        if(file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"|| file.mimetype=="image/png"){
            console.log("file is accepted!");
            cb(null,true);
        }
        else{
            console.log("file is rejected");
            return cb(null,false);
        }
        
    },
    limits:{
        fileSize:5*1024*1024
    }
})
