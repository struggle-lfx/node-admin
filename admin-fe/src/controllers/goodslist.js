import goodslistTpl from '../views/goodslist.hbs'

export const render=function(req, res, next) {
    res.render(goodslistTpl({}))
}