import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import app from './express';
import { typeDefs, resolvers } from './graphql';
import { APP_PORT } from './config';

(async function () {
	try {
		const httpServer = http.createServer(app);

		const server = new ApolloServer({
			typeDefs,
			resolvers,
			context: ({ req, res }) => ({ req, res }),
			plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		});

		await server.start();

		server.applyMiddleware({ app, path: '/graphql', cors: false });

		httpServer.listen({ port: APP_PORT }, () => {
			return console.log(`🚀 http://localhost:${APP_PORT}${server.graphqlPath}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
