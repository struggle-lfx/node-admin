var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const oAuth = require('../middlewares/oAuth')

/* GET users listing. */
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/issignin', oAuth);

module.exports = router;
