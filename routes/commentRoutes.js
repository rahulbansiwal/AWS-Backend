const express = require('express');
const router = express.Router();
const {validatejwttoken}= require('../middlewares/validatejwttoken');
const {createCommentController}= require('../controller/createCommentController');
const {deleteCommentController} = require('../controller/deleteCommentController');
const {updateCommentController}= require('../controller/updateCommentController');
const {getCommentByPostController} = require('../controller/getCommentByPostController');


router.route('/:postid').post(validatejwttoken,createCommentController).get(getCommentByPostController);
router.route('/:commentid')
.delete(validatejwttoken,deleteCommentController)
.patch(validatejwttoken,updateCommentController);


module.exports = router;