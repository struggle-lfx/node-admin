var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;
