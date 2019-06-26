var express = require('express');
var router = express.Router();
const goodsController = require('../controllers/goodsController')
const oAuthGoods = require('../middlewares/oAuthGoods')
const fileUpload = require('../middlewares/upload-file')
/* GET users listing. */
router.route('/')
     .all(oAuthGoods)
    .get(goodsController.findAll)
    .post(fileUpload.fileupload,goodsController.save)
    .delete(goodsController.delete)



module.exports = router;