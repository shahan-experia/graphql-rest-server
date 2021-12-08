import express from 'express';
import { catchAsync, wrapperController } from '../../../../utils';
import { adminController } from '../../../../controllers';

const router = express.Router();

router.get('/me', (...args) =>
	catchAsync(wrapperController(args, adminController.me)),
);

router.post('/login', (...args) =>
	catchAsync(wrapperController(args, adminController.login)),
);

router.delete('/me', (...args) =>
	catchAsync(wrapperController(args, adminController.logout)),
);

export default router;
