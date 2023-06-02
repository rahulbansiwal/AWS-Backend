const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');
const {updateUserController} = require('../controller/updateUserController');

router.route('/login').post(loginController.postLoginController);
router.route('/update/:username').patch(updateUserController);

module.exports = router;

