const { redis } = require('../library');

module.exports.signOut = function (tokenKey) {
	return new Promise((resolve, reject) => {
		redis
			.del(tokenKey)
			.then(() => resolve("You've successfully signed out."))
			.catch(reject);
	});
};
