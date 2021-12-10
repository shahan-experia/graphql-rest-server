import { middleware } from '../controllers';

export const ensureSignedIn = (args) => async (req, res, next) => {
	try {
		req.user = await middleware.ensureSignIn(args);

		next();
	} catch (error) {
		res.status(401).send(error.message || 'Not Authenticated');
	}
};

export const ensureSignedOut = (args) => async (req, res, next) => {
	try {
		await middleware.ensureSignOut(args);

		next();
	} catch (error) {
		res.status(401).send(error.message || 'Not Authenticated');
	}
};
