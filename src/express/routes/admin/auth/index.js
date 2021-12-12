const express = require('express');
const { catchAsync, wrapperController } = require('../../../../utils');
const { adminController } = require('../../../../controllers');
const { ensureSignedIn, ensureSignedOut } = require('../../../middleware');

const router = express.Router();

router.get('/me', ensureSignedIn({ shouldAdmin: true, shouldUser: false }), (...args) =>
	catchAsync(wrapperController(args, adminController.me)),
);

router.post('/login', ensureSignedOut({ shouldAdmin: true, shouldUser: false }), (...args) =>
	catchAsync(wrapperController(args, adminController.loginAdmin)),
);

router.delete('/logout', ensureSignedIn({ shouldAdmin: true, shouldUser: false }), (...args) =>
	catchAsync(wrapperController(args, adminController.logoutAdmin)),
);

module.exports = router;
