import { middleware } from '../controllers';
import { catchError } from '../utils';

export const ensureSignedIn = (args) => async (req, res, next) => {
	try {
		req.user = await middleware.ensureSignIn(args);

		next();
	} catch (error) {
		const { statusCode, errorMessage } = catchError(error);
		res.status(statusCode).send(errorMessage);
	}
};

export const ensureSignedOut = (args) => async (req, res, next) => {
	try {
		await middleware.ensureSignOut(args);

		next();
	} catch (error) {
		const { statusCode, errorMessage } = catchError(error);
		res.status(statusCode).send(errorMessage);
	}
};
