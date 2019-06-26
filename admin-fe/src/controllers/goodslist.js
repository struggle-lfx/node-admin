import goodslistTpl from '../views/goodslist.hbs'
import oAuth from '../util/oAuth'
import goodsaddTpl from '../views/goodsadd.hbs'


export const render=async (req, res, next)=> {
    let result = await oAuth()
    if(result.data.isSignin){
        $.ajax({
            url:'/api/goods',
            headers: {
                'X-Access-Token': localStorage.getItem('token') || ''
            },
            success(result){
                res.render(goodslistTpl({
                    data:result.data,
                    length:result.data.length>0
                }))
            }
        })
       
        bindgoods(res)
    }else{
        res.go('/')
    }
    
}
export const add =async (req,res,next)=>{
    res.render(goodsaddTpl({}))
    bindadd(res)
}

function bindgoods(res){
    $('#router-view').on('click','#addbtn',(e)=>{
        res.go('/goodsadd')

    })
}
function bindadd(res){
    $('#goodsback').on('click',(e)=>{
        res.back()
    })
    $('#goodssubmit').on('click',()=>{
        $('#goodssave').ajaxSubmit({
            resetForm:true,
            headers: {
                'X-Access-Token': localStorage.getItem('token') || ''
            },
            success(result){
                if(result.ret){
                    res.back()
                }else{
                    alert(result.data.message)
                }
                
            }
        })
        // $.ajax({
        //     url:'/api/goods',
        //     type:'POST',
        //     headers: {
        //         'X-Access-Token': localStorage.getItem('token') || ''
        //     },
        //     data:$('#goodssave').serialize(),
        //     success(result){
        //         alert(result.data.message),
        //         res.back()
        //     }
        // })
    })
}


