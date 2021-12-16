import { ApolloError, AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { middleware } from '../../controllers';
import { catchError } from '../../utils';

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = async (...args) => {
			try {
				args[2].req.user = await middleware.ensureSignIn(this.args);
			} catch (error) {
				const { statusCode, errorMessage } = catchError(error);
				switch (statusCode) {
					case '401': {
						throw new AuthenticationError(errorMessage);
					}
					default: {
						throw new ApolloError(errorMessage);
					}
				}
			}

			return resolve.apply(this, args);
		};
	}
}

export default AuthDirective;
