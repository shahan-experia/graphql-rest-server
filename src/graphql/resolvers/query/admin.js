const { adminController } = require('../../../controllers');

const admin = {
	me: (...args) => adminController.me(...args),
};

module.exports = admin;
