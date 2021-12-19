import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { catchError } from '.';

export const restWrapper = async function ([req, res], controller) {
	try {
		const root = null;
		let args = { ...req.query, ...req.params };
		if (req.body) args = { ...args, ...req.body };

		const result = await controller(root, args, { req, res });
		res.status(200).send(result);
	} catch (error) {
		const { statusCode, errorMessage } = catchError(error);
		res.status(statusCode).send(errorMessage);
	}
};

export const graphqlWrapper = async function (args, controller) {
	try {
		const result = await controller(...args);
		return result;
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
};

export const catchAsync =
	(handler) =>
	async (...args) => {
		const [, res] = args;
		try {
			const result = await handler(...args);
			return result;
		} catch (error) {
			const { statusCode, errorMessage } = catchError(error);
			res.status(statusCode).send(errorMessage);
		}
	};
