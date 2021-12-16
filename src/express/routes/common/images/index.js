import express from 'express';
import { catchAsync } from '../../../../utils';
import { commonController } from '../../../../controllers';

const router = express.Router();

router.post('/upload', catchAsync(commonController.uploadImage));

router.get('/', catchAsync(commonController.getImage));

router.delete('/', catchAsync(commonController.removeImage));

export default router;
