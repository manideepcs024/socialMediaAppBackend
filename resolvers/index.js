const Postresolvers = require('./posts.js');
const Tablesresolvers = require('./tables');
const userResolvers = require('./user');
const commentsResolvers = require('./comments');

module.exports={
	Post:{
		likeCount(parent){
         console.log(parent.likes.length);
		 return parent.likes.length;
		},
		commentCount(parent){
			return parent.comments.length;
		}

	},
	Query:{
		...Postresolvers.Query,
		...Tablesresolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation,
		...Postresolvers.Mutation,
		...commentsResolvers.Mutation
	},
	Subscription: {
		...Postresolvers.Subscription
	}
}