const db = require('../utils/db')


const userModule={
    _init(){
        this.UserModule=db.model('users',{
            username:String,
            password:String
        })
    },

    //数据存储
    _save(data){
        //实例化module，并且传入需要插入的数据
        const user = new this.UserModule(data);
        //执行插入操作
       return user.save()
    }
}

//初始化
userModule._init()

module.exports = userModule