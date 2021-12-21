import { middleware } from '../controllers';
import { logics } from '../utils';

export const ensureSignedIn = (args) => async (req, res, next) => {
	try {
		req.user = await middleware.ensureSignIn(
			args,
			req.get('Authorization') || req.headers.Authorization,
		);

		next();
	} catch (error) {
		const { statusCode, errorMessage } = logics.catchError(error);
		res.status(statusCode).send(errorMessage);
	}
};

export const ensureSignedOut = (args) => async (req, res, next) => {
	try {
		await middleware.ensureSignOut(args);

		next();
	} catch (error) {
		const { statusCode, errorMessage } = logics.catchError(error);
		res.status(statusCode).send(errorMessage);
	}
};
