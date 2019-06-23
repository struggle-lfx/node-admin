const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const oAuth = (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8');//设置响应格式
    let token = req.header('X-Access-Token');
    let cert = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'))
    // let cert = 'i love you'
    jwt.verify(token, cert, (err, decode) => {
        if (!err) {
            next()
            res.render('succ', {
                data: JSON.stringify({
                    username: decode.username,
                    isSignin: true
                })
            })
            
        } else {
            //console.log(err.stack)
            res.render('fail', {
                data: JSON.stringify({
                    isSignin: false
                })
            })
        }
    })
    //console.log(req.header('X-Access-Token'))
}

module.exports = oAuth
