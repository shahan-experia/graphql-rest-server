const { gql } = require('apollo-server-express');

const rootSchema = gql`
  type Admin {
    id: ID!
    username: String!
    createdAt: Date!
    updatedAt: Date!
  }

	extend type Query {
		me: Admin!
	}

	extend type Mutation {
		loginAdmin(username: String!, password: String!): Admin!
    logoutAdmin: Status!
	}
`;

export default rootSchema;
