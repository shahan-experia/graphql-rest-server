import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import app from './src/express';

(async function () {
	try {
		const httpServer = http.createServer(app);

		// The GraphQL schema
		const typeDefs = gql`
			type Query {
				hello: String
			}
		`;

		// A map of functions which return data for the schema.
		const resolvers = {
			Query: {
				hello: () => 'Hello world',
			},
		};

		const server = new ApolloServer({
			typeDefs,
			resolvers,
			plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		});

		await server.start();

		server.applyMiddleware({ app, path: '/graphql', cors: false });

		httpServer.listen({ port: 4000 }, () => {
			return console.log(`🚀 http://localhost:4000${server.graphqlPath}`);
		});
	} catch (error) {
		console.error(error);
	}
})();
