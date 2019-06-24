var express = require('express');
var router = express.Router();
const goodsController = require('../controllers/goodsController')
const oAuthGoods = require('../middlewares/oAuthGoods')
const oAuth = require('../middlewares/oAuth')
/* GET users listing. */
router.route('/')
    .all(oAuth)
    .get(goodsController.find)



module.exports = router;