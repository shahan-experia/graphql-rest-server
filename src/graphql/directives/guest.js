import { ApolloError, AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { middleware } from '../../controllers';
import { catchError } from '../../utils';

class GuestDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field, details) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = async (...args) => {
			try {
				await middleware.ensureSignOut(this.args);
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

export default GuestDirective;
