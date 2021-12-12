const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const app = require('./express');
const { typeDefs, resolvers, schemaDirectives } = require('./graphql');
const { APP_PORT, IN_PROD } = require('./config');

const server = new ApolloServer({
	introspection: true,
	typeDefs,
	resolvers,
	schemaDirectives,
	context: ({ req, res }) => ({ req, res }),
	playground: IN_PROD
		? false
		: {
				'request.credentials': 'include',
				shareEnabled: true,
		  },
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: APP_PORT }, () => {
	console.log(`🚀 http://localhost:${APP_PORT}${server.graphqlPath}`);
});

module.exports = httpServer;
