const db= require('../utils/db')

class PositionMondel{
    constructor(){
        let GoodsSchema = {//定义字段

        }
        this.positionMondel=db.model('goods',GoodsSchema)

    }
    
}