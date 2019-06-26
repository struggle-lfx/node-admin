//文件上传中间件
const multer = require('multer')  //处理上传文件
const path = require('path')
const randomstring = require('random-string')  //生成随机字符串
class Fileupload {
    fileFilter(req, file, cb) {

        let regexp = new RegExp('(image\/png|image\/jpg|image\/jpeg|image\/gif)', 'gi')
        if (regexp.test(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null, false)
            cb(new Error('文件格式不正确'))
        }
    }

    fileupload(req, res, next) {
        let filename = ''
        //要存储的信息 
        let storage = multer.diskStorage({
            //目标文件夹的位置
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '../public/upload'))
            },
            //目标文件名
            filename: (req, file, cb) => {
                let fileOriname = file.originalname;  //获取用户电脑上的文件名
                let lastdot = fileOriname.lastIndexOf('.') //获取文件名中点最后出现的位置
                let extFilename = fileOriname.slice(lastdot)  //获取扩展名
                let str = randomstring({
                    length: 10
                })

                 filename = str + extFilename
                cb(null, filename)
            }
        })

        var upload = multer({ storage: storage, fileFilter: fileupload.fileFilter }).single('photo')
        upload(req, res, (err) => {
            if (err) {
                res.render('fail', {
                    data: JSON.stringify(err.message)
                })
            }
            else {
                req.filename = filename
                next()
            }

        })
    }
}

const fileupload = new Fileupload()
module.exports = fileupload