import SMERouter from 'sme-router'
import * as indexController from '../controllers/index'
import * as goodslistController from '../controllers/goodslist'

const router = new SMERouter('router-view')

router.route('/',indexController.render)
router.route('/goodslist',goodslistController.render)
