import userTpl from '../views/users.html'

class Users {
    constructor() {
        this._renderUser({ isSignin: false })
        this._user()
    }

    _renderUser({ isSignin = false, username = '' }) {
        let template = Handlebars.compile(userTpl);
                let str = template({
                    isSignin,
                    username
                })
                $('.user-menu').html(str)

        $.ajax({
            url: '/api/users/issignin',
            success: (result) => {
                let template = Handlebars.compile(userTpl);
                let str = template({
                    isSignin: result.data.isSignin,
                    username: result.data.username
                })
                $('.user-menu').html(str)
            },


        })
    }


    //给user添加点击事件
    _user() {
        let that = this
        $('.user-menu').on('click','#reset',()=>{
            $.ajax({
                url:'/api/users/signout',
                success:()=>{
                    location.reload()
                }
            })
        })

        $('#user').on('click','#reset' ,() => {
            console.log(0)
            $.ajax({
                url: '/api/users/signout',
                success(result) {
                    location.reload()
                }
            })
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
                contentType: 'application/x-www-form-urlencoded',
                data: $('#user-form').serialize(),   //serialize方法序列化表格内容位字符串
                success: (result) => {
                    // alert(result.data.message)
                    this._signinssucc(result)

                }
            })
        })
    }

    _signinssucc(result) {
        if (result.ret) {
            this._renderUser({
                isSignin: true,
                username: result.data.username
            })
        }

    }


}


export default Users