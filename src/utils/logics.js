const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { redis } = require('../library');

module.exports.validateToken = async function (tokenKey) {
	const token = await redis.get(tokenKey);
	if (!token) throw new Error('You need to sign in.');

	const decoded = jwt.verify(token, JWT_SECRET);
	const now = Date.now() / 1000;

	if (decoded.exp < now) throw new Error('Session Expired.');

	return decoded;
};

module.exports.getToken = function (tokenKey) {
	return redis.get(tokenKey);
};
