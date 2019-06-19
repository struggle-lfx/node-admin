const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27071/5lux');

module.exports = db;