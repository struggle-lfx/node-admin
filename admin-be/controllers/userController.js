const userModule = require('../modules/userModule')
const bcrypt = require('bcrypt')
const bcryptjs = require('bcryptjs')


class UserController {
    _hashPassword(pwd) {
        return new Promise((resolve, reject) => {
            bcryptjs.hash(pwd, 10, (err, hash) => {
                resolve(hash)
            })
        })}

    hashPassword(pwd){
        return bcryptjs.hash(pwd, 10)
    }
    async signUp(req, res, next) {
        res.set('Content-Type', 'application/json;charset=utf-8');//设置响应格式
        console.log(typeof req.body.password)
        let hash = await userController.hashPassword(req.body.password)
        console.log(hash)
        let result = await userModule._save({...req.body,password:hash})
        //console.log(result)
        if (result) {
            res.render('succ', {    //使用ejs模板，render方法回自动去找目录
                data: JSON.stringify({
                    message: '数据插入成功'
                })
            })
        }
        else {
            res.render('fail', {    //使用ejs模板，render方法回自动去找目录
                data: JSON.stringify({
                    message: '数据插入失败'
                })
            })
        }

    }
}
const userController = new UserController()
module.exports = userController