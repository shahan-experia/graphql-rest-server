import express from 'express';
import { catchAsync, restWrapper } from '../../../../utils';
import { adminController } from '../../../../controllers';
import { ensureSignedIn, ensureSignedOut } from '../../../middleware';

const router = express.Router();

router.get('/me', ensureSignedIn({ shouldAdmin: true, shouldUser: false }), (...args) =>
	catchAsync(restWrapper(args, adminController.me)),
);

router.post('/login', ensureSignedOut({ shouldAdmin: true, shouldUser: false }), (...args) =>
	catchAsync(restWrapper(args, adminController.loginAdmin)),
);

router.delete('/logout', ensureSignedIn({ shouldAdmin: true, shouldUser: false }), (...args) =>
	catchAsync(restWrapper(args, adminController.logoutAdmin)),
);

export default router;
