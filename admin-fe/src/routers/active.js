
//定义高亮的中间件
export default (req)=>{
let url =req.url
$(`.sidebar-menu a[href="/#${url}"]`).parent().addClass('active').siblings().removeClass('active')

}