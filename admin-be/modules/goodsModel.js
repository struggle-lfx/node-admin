const db= require('../utils/db')

class GoodsMondel{
    constructor(){
        let GoodsSchema = {//定义字段
            // photo:String,
            name:String,
            price:String,
            createDate:String

        }
        this.goodsMondel=db.model('goods',GoodsSchema)

    }

    //查询所有的数据
    findAll(){
        return this.goodsMondel.find({})

    }

    //商品信息保存
    save(data){
        let good= new this.goodsMondel({...data,createDate:new Date()})
        return good.save()
    }

    //查询部分数据
    findMany({page,pagesize}){
        return this.goodsMondel.find({}).skip(page*pagesize).limit(pagesize)
    }
    
}


const goodsMondel = new GoodsMondel()
module.exports = goodsMondel