import menuTpl from '../views/menu.html'
import userTpl from '../views/users.html'

//(req,res,next)是sme-router中的写法

export function render(req, res, next) {
    //把左侧菜单html放到模板中
    let template = Handlebars.compile(menuTpl);
    //把数据传进去
    let str = template({ title: 'hello' })
    $('.sidebar-menu').html(str);
    $('.user-menu').html(userTpl)
    res.render('home')
}


