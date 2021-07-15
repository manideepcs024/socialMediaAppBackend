const { UserInputError } = require('apollo-server');
const checkAuthentication = require('../utils/check-authentication.js');
const Post = require('./../model/Post.js');

module.exports = {
	Mutation: {
		async createComment(_, { postId, body }, context) {
			const user = checkAuthentication(context);
			if (body.trim() === '') {
				throw new UserInputError('Cannot post empty comment', {
					errors: {
						body: 'Comment body must not be empty'
					}
				});
			} else {
				const post = await Post.findById(postId);
				if (post) {
					post.comments.unshift({
						body,
						username: user.username,
						createdAt: new Date().toISOString()
					});
					await post.save();
					return post;
				} else {
					throw new UserInputError('Post does not exist');
				}
			}
		},
		async deleteComment(_, {postId, commentId}, context) {
			const user = checkAuthentication(context);
			const post = await Post.findById(postId);
			try{
				if(post) {
					const commentIndex = post.comments.findIndex(c=>c.id===commentId);
					if(commentIndex > -1){
						console.log("ci",commentIndex);
						if(post.comments[commentIndex].username ===user.username){
							post.comments.splice(commentIndex,1);
							await post.save();
							return post;
						}else{
							throw new Error('User not allowed to delete this comment');
						}
					}else{
						return 'Comment does not exist.'
					}
				}else{
					throw new Error('Post does not exist');
				}
			}catch{
				throw new Error('Something is wrong');

			}
			
		}
	}

};