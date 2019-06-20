const userModule = require('../modules/userModule')
const userController ={



    async signUp(req,res,next){
        res.set('Content-Type','application/json;charset=utf-8');//设置响应格式
        let result = await userModule._save(req.body)
        if(result){
            res.render('succ',{    //使用ejs模板，render方法回自动去找目录
                data:JSON.stringify({
                    message:'数据插入成功'
                })
            })
        }
        else{
            res.render('fail',{    //使用ejs模板，render方法回自动去找目录
                data:JSON.stringify({
                    message:'数据插入失败'
                })
            })
        }
       
    }
}
module.exports = userController