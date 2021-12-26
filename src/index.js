import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import app from './express';
import { typeDefs, resolvers, directives } from './graphql';
import { APP_HOST, APP_PORT, APP_PROTOCOL } from './config';

const httpServer = http.createServer(app);

let schema = makeExecutableSchema({ typeDefs, resolvers });
Object.entries(directives).forEach(([key, directive]) => (schema = directive(schema, key)));

const server = new ApolloServer({
	introspection: true,
	schema,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	context: ({ req, res }) => ({ req, res }),
});

server.start().then(() => {
	server.applyMiddleware({ app, path: '/graphql', cors: false });

	httpServer.listen({ port: APP_PORT }, () => {
		console.log(`🚀 ${APP_PROTOCOL}://${APP_HOST}${server.graphqlPath}`);
	});
});

export default httpServer;
