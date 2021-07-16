const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./resolvers');
const { MONGODB } = require('./config.js');

const PORT = process.env.PORT || 4000;

const pubsub = new PubSub();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context:({ req }) => ({req, pubsub})
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
	.then(() => {
		console.log("MONGODB Connected");
		server.listen({ port: PORT })
			.then((res) => {
				console.log(`server running at ${res.url}`);
			}).catch((err)=>{
				console.error(err);
			});
	});


