const { middleware } = require('../controllers');

module.exports.ensureSignedIn = (args) => async (req, res, next) => {
	try {
		req.user = await middleware.ensureSignIn(args);

		next();
	} catch (error) {
		res.status(401).send(error.message || 'Not Authenticated');
	}
};

module.exports.ensureSignedOut = (args) => async (req, res, next) => {
	try {
		await middleware.ensureSignOut(args);

		next();
	} catch (error) {
		res.status(401).send(error.message || 'Not Authenticated');
	}
};
