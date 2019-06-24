class GoodsController{
    constrution(){
        
    }

    //查询部分数据
    async findMany(req,res,next){
        //获取前端来的数据
        let {page=0,pagessize=10} = req.query;//给page和pagesize赋初值
    }
    find(req,res,next){
        res.set('Content-Type', 'application/json;charset=utf-8');//设置响应格式
        res.render('succ',{
            data:'ok'
        })
    }


}

const goodsController = new GoodsController()
module.exports = goodsController