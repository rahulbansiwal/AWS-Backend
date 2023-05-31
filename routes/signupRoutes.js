const express = require('express');
const router = express.Router();
const SignUpControllers = require('../controller/signupController');
router.route('/').post(SignUpControllers.postSignupController)


module.exports = router;