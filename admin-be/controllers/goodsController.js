const goodsModule = require('../modules/goodsModel')

class GoodsController{
    constrution(){
        
    }

    //查询部分数据
    async findMany(req,res,next){
        //获取前端来的数据
        let {page=0,pagessize=10} = req.query;//给page和pagesize赋初值
    }

    //查询所有数据
    async findAll(req,res,next){
        res.set('Content-Type', 'application/json;charset=utf-8');//设置响应格式
        let result = await goodsModule.findAll()
        res.render('succ',{
            data: JSON.stringify(result) 
        })
    }
    
    async save(req,res,next){
        res.set('Content-Type','application/json;charset=utf-8')
        let result = await goodsModule.save(req.body)
        if(result){
            res.render('succ', {    //使用ejs模板，render方法回自动去找目录
                data: JSON.stringify({
                    message: '商品添加成功' 
                })
            })
        }
    }


}

const goodsController = new GoodsController()
module.exports = goodsController