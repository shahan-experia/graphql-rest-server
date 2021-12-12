const { signOut } = require('../../utils');

function logoutAdmin() {
	return signOut('adminToken');
}

module.exports = logoutAdmin;
