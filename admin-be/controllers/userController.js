const userModule = require('../modules/userModule')
const bcrypt = require('bcrypt')

 class UserController{
     constructor(){

     }
     //密码加密方法
    hashPassword(pwd){
        return new Promise((resolve,reject)=>{
            bcrypt.hash(pwd,10,(err,hash)=>{
                resolve(hash)
            })
        })
         
     }
 
     async signUp(req,res,next){
         res.set('Content-Type','application/json;charset=utf-8');//设置响应格式
         let hash = await userController.hashPassword(req.body.password)  //对注册时输入的密码进行加密
         let result = await userModule._save({...req.body,password:hash})   //...展开运算符，将加密完的密码进行重写
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
const userController = new UserController()
module.exports = userController