import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import app from './express';
import { typeDefs, resolvers, schemaDirectives } from './graphql';
import { APP_PORT, IN_PROD } from './config';

const httpServer = (async function () {
	try {
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

		await server.start();

		server.applyMiddleware({ app, path: '/graphql', cors: false });

		const httpServer = http.createServer(app);
		server.installSubscriptionHandlers(httpServer);

		httpServer.listen({ port: APP_PORT }, () => {
			console.log(`🚀 http://localhost:${APP_PORT}${server.graphqlPath}`);
		});

		return httpServer;
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();

export default httpServer;
