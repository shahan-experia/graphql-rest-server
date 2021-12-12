const { gql } = require('apollo-server-express');

const rootSchema = gql`
  type Admin {
    id: ID!
    username: String!
    createdAt: Date!
    updatedAt: Date!
  }

	extend type Query {
		me: Admin! @auth(shouldAdmin: true)
	}

	extend type Mutation {
		loginAdmin(username: String!, password: String!): Admin! @guest(shouldAdmin: true)
    logoutAdmin: String! @auth(shouldAdmin: true)
	}
`;

module.exports = rootSchema;
