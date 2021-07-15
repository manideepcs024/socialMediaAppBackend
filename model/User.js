const { model, Schema } = require('mongoose');

const UserShcema = new Schema({
	username: String,
	password: String,
	email: String,
	createdAt: String
});
module.exports = model('User', UserShcema);