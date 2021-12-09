const { gql } = require('apollo-server-express');

const rootSchema = gql`
	scalar Date

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}

	type Status {
		success: Boolean!
		message: String!
		debugMessage: String
	}
`;

export default rootSchema;
