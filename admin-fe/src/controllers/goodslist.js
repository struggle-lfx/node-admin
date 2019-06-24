import goodslistTpl from '../views/goodslist.hbs'
import oAuth from '../util/oAuth'
import goodsaddTpl from '../views/goodsadd.hbs'

export const render=async (req, res, next)=> {
    let result = await oAuth()
    if(result.data.isSignin){
        res.render(goodslistTpl({}))
        bind(res)
    }else{
        res.go('/')
    }
    
}
export const add =async (req,res,next)=>{
    res.render(goodsaddTpl({}))
}

function bind(res){
    $('#addbtn').on('click',(e)=>{
        res.go('/goodsadd')

    })
}


