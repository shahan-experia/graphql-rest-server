import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { middleware } from '../../controllers';

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

export default GuestDirective;
