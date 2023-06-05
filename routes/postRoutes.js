const express = require('express');
const {uploadfile} = require('../controller/uploadpostAWS-S3');
const {uploadPostController} = require('../controller/uploadpostController');
const router = express.Router();
const {getPostByIdController} = require('../controller/getPostByIdController');
const {deletePost}= require('../controller/deletepost');
const {updatePostController} = require('../controller/updatePostController');
const {updatefile} = require('../controller/updatepostAWS-S3');
const {validatejwttoken}= require('../middlewares/validatejwttoken');
const {likepostController} = require('../controller/likepostController');
const {getPostsController} = require("../controller/getPostsController");

router.route('/').get(validatejwttoken,getPostsController);
router.route('/:username').post(validatejwttoken,uploadfile.single('key'),uploadPostController);
router.route('/:postid').get(getPostByIdController).delete(validatejwttoken,deletePost);
router.route('/:username/:postid').patch(validatejwttoken,updatePostController,updatefile.single('key'),(req,res,next)=>{
    res.status(200).json({
        message:"updated",
        file :req.file.location
    })
});
router.route('/like/:postid').get(validatejwttoken,likepostController);
module.exports = router;