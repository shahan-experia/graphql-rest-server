const { AuthenticationError, SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');
const { middleware } = require('../../controllers');

class GuestDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field, details) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = async (...args) => {
			try {
				await middleware.ensureSignOut(this.args);
			} catch (error) {
				throw new AuthenticationError(error.message);
			}

			return resolve.apply(this, args);
		};
	}
}

module.exports = GuestDirective;
