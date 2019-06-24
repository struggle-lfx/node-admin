import SMERouter from 'sme-router'
import * as indexController from '../controllers/index'
import * as goodslistController from '../controllers/goodslist'
import activeMiddleware from './active'    //引用高亮的中间件

const router = new SMERouter('router-view')  //定义路由应该写到什么地方去

router.route('/', indexController.render)
router.route('/goodslist', goodslistController.render)
//重定向
router.route('*', (req, res, next) => {
  res.redirect('/')
})
router.use(activeMiddleware)  //使用中间件

