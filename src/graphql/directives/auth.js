import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { middleware } from '../../controllers';

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

export default AuthDirective;
