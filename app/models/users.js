var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://10.7.0.3:27107/data/chat-room')

module.exports = mongoose.model('User', new Schema({
  name: String,
  password: String,
  admin: Boolean
}));
