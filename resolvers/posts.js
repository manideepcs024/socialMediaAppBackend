const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../model/Post.js');
const checkAuth = require('../utils/check-authentication.js');


const Postresolvers = {
	Query: {
		async getPosts() {
			try {
				const postnew = await Post.find().sort({ createdAt: -1 });
				return postnew;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getPost(_, { postId }) {
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;

				} else {
					throw new Error('Post does not exist');
				}

			} catch (err) {
				throw new Error(err);
			}
		},

	},
	Mutation: {
		async createPost(_, { body }, context) {

			const user = checkAuth(context);
			if(body.trim()===''){
				throw new UserInputError('Body Must not be empty');
			}
			const newPost = new Post({
				id: user.id,
				body,
				createdAt: new Date().toISOString(),
				username: user.username
			});
			const post = await newPost.save();
			context.pubsub.publish('NEW_POST',{
				newPost:post

			});
			return post;

		},
		async deletePost(_, { postId }, context) {
			const user = checkAuth(context);
			try {
				const post = await Post.findById(postId);
				if (user.username == post.username) {
					post.delete();
					return 'post deleted';
				} else {
					return 'can not delete, its not your';
				}

			} catch {
				throw new AuthenticationError('can not delete');
			}

		},
		async likePost(_, { postId }, context) {
			const user = checkAuth(context);
			const post = await Post.findById(postId);
			if (post) {
				if (post.likes.find(like => like.username === user.username)) {
					post.likes = post.likes.filter(like => like.username !== user.username);
					await post.save();

				} else {
					post.likes.push({
						username: user.username,
						createdAt: new Date().toISOString()
					});
				}
				await post.save();
				return post;

			} else {
				throw new Error('Post does not exist');
			}
		}
	},
	Subscription: {
		newPost: {
			subscribe: (_,__,{pubsub})=>pubsub.asyncIterator('NEW_POST')
		}
	}

}

module.exports = Postresolvers;