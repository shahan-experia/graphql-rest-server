import express from 'express';
import { catchAsync, wrapperController } from '../../../../utils';
import { adminController } from '../../../../controllers';
import { ensureSignedIn, ensureSignedOut } from '../../../middleware';

const router = express.Router();

router.get('/me', ensureSignedIn, (...args) =>
	catchAsync(wrapperController(args, adminController.me)),
);

router.post('/login', ensureSignedOut, (...args) =>
	catchAsync(wrapperController(args, adminController.loginAdmin)),
);

router.delete('/logout', ensureSignedIn, (...args) =>
	catchAsync(wrapperController(args, adminController.logoutAdmin)),
);

export default router;
