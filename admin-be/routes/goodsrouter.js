var express = require('express');
var router = express.Router();
const goodsController = require('../controllers/goodsController')
const oAuthGoods = require('../middlewares/oAuthGoods')
/* GET users listing. */
router.route('/')
     .all(oAuthGoods)
    .get(goodsController.findAll)
    .post(goodsController.save)



module.exports = router;