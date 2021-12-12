const { adminController } = require('../../../controllers');

const admin = {
	loginAdmin: (...args) => adminController.loginAdmin(...args),
	logoutAdmin: (...args) => adminController.logoutAdmin(...args),
};

module.exports = admin;
