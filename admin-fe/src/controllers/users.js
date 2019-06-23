import userTpl from '../views/users.html'

class Users {
    constructor() {
        //第一次进入系统时，做一次认证
        this._oAuth()
    }

    //第一次进入时，判断是否登录
    _oAuth() {
        $.ajax({
            url: '/api/users/issignin',
            headers: {
                'X-Access-Token': localStorage.getItem('token')
            },
            dataType: 'json',
            success: (result) => {
                this._renderUser({
                    isSignin: result.data.isSignin,
                    username: result.data.username
                })
            },
            error: (err) => {
                this._renderUser({
                    isSignin: false
                })
            }
        })
    }
    _renderUser({ isSignin = false, username = '' }) {
        let template = Handlebars.compile(userTpl);
        let str = template({
            isSignin,
            username
        })
        $('.user-menu').html(str);
        this._user()
    }


    //给user添加点击事件
    _user() {
        let that = this
        $('.user-menu').on('click','#reset',()=>{
            localStorage.removeItem('token')
            location.reload()
        })
        $('#user').on('click', 'span', function (e) {
            if ($(this).attr("id") === "user-signin") {
                $('.box-title').html("登录")
                that._signin()
            } else {
                $('.box-title').html("注册")
                that._signup()
            }
        })
    }


    //用户注册
    _signup() {
        $('#confirm').on('click', function () {
            $.ajax({
                url: '/api/users/signup',
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                data: $('#user-form').serialize(),   //serialize方法序列化表格内容位字符串
                success(result) {
                    alert(result.data.message)
                }
            })
        })
    }
    //登录
    _signin() {
        $('#confirm').on('click', async () => {
            $.ajax({
                url: '/api/users/signin',
                type: 'POST',
                headers: {
                    'X-Access-Token': localStorage.getItem('token') || ''
                },
                contentType: 'application/x-www-form-urlencoded',
                data: $('#user-form').serialize(),   //serialize方法序列化表格内容位字符串
                success: (result, textStatus, jqXHR) => {
                    // alert(result.data.message)
                    this._signinssucc(result, jqXHR)
                }
            })
        })
    }

    _signinssucc(result, jqXHR) {
        if (result.ret) {
            this._renderUser({
                isSignin: true,
                username: result.data.username
            })
        }
        localStorage.setItem('token', jqXHR.getResponseHeader('X-Access-Token'))
    }
}


export default Users