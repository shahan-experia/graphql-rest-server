const { AuthenticationError, SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');
const { middleware } = require('../../controllers');

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = async (...args) => {
			try {
				args[2].req.user = await middleware.ensureSignIn(this.args);
			} catch (error) {
				throw new AuthenticationError(error.message);
			}

			return resolve.apply(this, args);
		};
	}
}

module.exports = AuthDirective;
