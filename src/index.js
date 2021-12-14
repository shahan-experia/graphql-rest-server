import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import app from './express';
import { typeDefs, resolvers, schemaDirectives } from './graphql';
import { APP_HOST, APP_PORT, APP_PROTOCOL, IN_PROD } from './config';

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
	console.log(`🚀 ${APP_PROTOCOL}://${APP_HOST}${server.graphqlPath}`);
});

export default httpServer;
