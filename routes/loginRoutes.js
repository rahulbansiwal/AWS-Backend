const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');

router.route('/').post(loginController.postLoginController);
//router.route('/:id').post(loginController.postLoginController);

module.exports = router;

