const AuthDirective = require('./auth');
const GuestDirective = require('./guest');

const schemaDirectives = {
	auth: AuthDirective,
	guest: GuestDirective,
};

module.exports = schemaDirectives;
