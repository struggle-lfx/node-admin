//连接数据库

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/5lux', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
module.exports = db;