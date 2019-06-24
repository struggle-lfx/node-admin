const db= require('../utils/db')

class PositionMondel{
    constructor(){
        let GoodsSchema = {//定义字段

        }
        this.positionMondel=db.model('goods',GoodsSchema)

    }

    //查询部分数据
    findMany({page,pagesize}){
        return this.positionMondel.find({}).skip(page*pagesize).limit(pagesize)
    }
    
}