import menuTpl from '../views/menu.html'
import userTpl from '../views/users.html'
import homeTpl from '../views/home.hbs'

//(req,res,next)是sme-router中的写法

//渲染user模板
function _renderUser({isSignin=false}) {
    let template = Handlebars.compile(userTpl);
    let str = template({
        isSignin
    })
    $('.user-menu').html(str)
}


//给user添加点击事件
function _user() {
  
    $('#user').on('click', 'span', function(e) {
        if ($(this).attr("id") === "user-signin") {
            $('.box-title').html("登录")
        } else {
            $('.box-title').html("注册")
        }

    })
}
export function render(req, res, next) {

    $('.sidebar-menu').html(menuTpl);
    res.render(homeTpl())
    _renderUser({ isSignin: false })
    //调用user方法
    _user()
}


