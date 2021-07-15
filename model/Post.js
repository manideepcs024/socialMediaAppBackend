const { model, Schema } = require('mongoose');

const post = {
	body: String,
	username: String,
	createdAt: String,
	comments: [
		{
			body: String,
			username: String,
			createdAt: String
		}
	],
	likes: [
		{
			username: String,
			createdAt: String
		}
	],
	user:{
		type: Schema.Types.ObjectId,
		ref: 'Users'
	}

}
const PostSchema = new Schema(post);

module.exports = model('Post',PostSchema,'posts');

//https://www.youtube.com/watch?v=n1mdAPFq2Os&list=RDCMUC8butISFwT-Wl7EV0hUK0BQ&index=11