import menuTpl from '../views/menu.html'

//(req,res,next)是sme-router中的写法
export const render =(req,res,next)=>{
    //把html放到模板中
    let template = Handlebars.compile(menuTpl);
    //把数据传进去
    let str= template({title:'hello'})
    $('.sidebar-menu').html(str);
    res.render('home')

}