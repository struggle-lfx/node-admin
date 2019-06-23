const userModule = require('../modules/userModule')
const bcrypt = require('bcrypt')
const bcryptjs = require('bcryptjs')

class UserController {

    //密码加密
    _hashPassword(pwd) {
        return new Promise((resolve, reject) => {
            bcryptjs.hash(pwd, 10, (err, hash) => {
                resolve(hash)
            })
        })
    }

    hashPassword(pwd) {
        return bcryptjs.hash(pwd, 10)
    }

    //比对密码
    comparePassword(pwd, hash) {
        return bcryptjs.compare(pwd, hash)
    }

    //用户注册
    async signup(req, res, next) {     
        res.set('Content-Type', 'application/json;charset=utf-8');//设置响应格式
        let user = await userModule._find(req.body)
        if(user){
            res.render('fail', {    //使用ejs模板，render方法回自动去找目录
                data: JSON.stringify({
                    message: '用户名已存在' 
                })
            })
            return
        }       
        let hash = await userController.hashPassword(req.body.password)
        let result = await userModule._save({ ...req.body, password: hash })
        if (result) {
            res.render('succ', {    //使用ejs模板，render方法回自动去找目录
                data: JSON.stringify({
                    message: '用户注册成功'
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


    //用户登录
    async signin(req, res, next) {
        res.set('Content-Type', 'application/json;charset=utf-8');//设置响应格式
        let result = await userModule._find(req.body)
        if (result) {
            if (await userController.comparePassword(req.body.password, result['password'])) {
                //创建session,保存用户名  往前端中cookie
                
                req.session.username = result['username'];
                console.log(req.session)
                res.render('succ', {    //使用ejs模板，render方法回自动去找目录
                    data: JSON.stringify({
                        username:result['username'],
                        message: '用户登录成功'
                    })
                })
            } else {
                res.render('fail', {    //使用ejs模板，render方法回自动去找目录
                    data: JSON.stringify({
                        message: '密码错误'
                    })
                })
            }

        } else {
            res.render('fail', {    //使用ejs模板，render方法回自动去找目录
                data: JSON.stringify({
                    message: '用户名不存在'
                })
            })
        }
    }

    //判断是否登录
    issignin(req,res,next){
        res.set('Content-Type', 'application/json;charset=utf-8');//设置响应格式
        if(req.session.username){
            res.render('succ', {    //使用ejs模板，render方法回自动去找目录
                data: JSON.stringify({
                    isSignin:true,
                    username:req.session.username
                })
            })
        }else{
            console.log(0)
            res.render('fail', {    //使用ejs模板，render方法回自动去找目录
                data: JSON.stringify({
                    isSignin:false
                })
            })
        }
    }

    //注销
    signout(req,res,next){
        req.session = null
        res.render('succ', {    //使用ejs模板，render方法回自动去找目录
            data: JSON.stringify({
                isSignin:false
            })
        })
    }
}


const userController = new UserController()
module.exports = userController