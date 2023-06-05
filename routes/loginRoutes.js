const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');
const {updateUserController} = require('../controller/updateUserController');
const {getUserController}= require("../controller/getUserController");
router.route('/login').post(loginController.postLoginController);
router.route('/update/:username').patch(updateUserController);
router.route('/').get(getUserController);
module.exports = router;

