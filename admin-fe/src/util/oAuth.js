export default function() {
      return $.ajax({
        url: '/api/users/issignin',
        headers: {
            'X-Access-Token': localStorage.getItem('token')
        },
        dataType: 'json',
        success: (result) => {
            // this._renderUser({
            //     isSignin: result.data.isSignin,
            //     username: result.data.username
            // })
            return result;
        },
        error: (err) => {
            // this._renderUser({
            //     isSignin: false
            // })

            return false;
        }
    })
}