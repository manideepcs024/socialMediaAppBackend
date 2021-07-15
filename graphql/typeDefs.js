const gql = require('graphql-tag');

const typeDefs = gql`
type Post{
	id: ID!,
	body:String!,
	createdAt:String!,
	username:String!,
	comments: [Comments]!,
	likes: [Likes]!,
	likeCount: Int!,
	commentCount: Int!,
}
type Comments {
	id: ID!,
	body: String!,
	username: String!,
	createdAt: String!
}
type Likes {
	id: ID!,
	username:String!,
	createdAt:String!
}
type Table{
	id: ID!,
	size:String!,
	createdAt: String!
}
type User{
	id: ID!,
	email: String!,
	token: String!,
	username: String!,
	createdAt: String! 
}
input RegisterInput{
	username: String!,
	password: String!,
	confirmPassword: String!,
	email: String!
}
type Query{
	getPosts: [Post],
	getTables: [Table],
	getPost(postId: ID!):Post

}
type Mutation{
	register(registerInput: RegisterInput): User!,
	login(username:String!,password:String!):User!,
	createPost(body:String!): Post!,
	deletePost(postId: ID!): String!,
	createComment(postId:ID!,body:String!) : Post!,
	deleteComment(postId:ID!,commentId: ID!): Post!,
	likePost(postId: ID!): Post!
}
type Subscription {
	newPost: Post!
}
`
module.exports = typeDefs;

//continue from 45 minutes