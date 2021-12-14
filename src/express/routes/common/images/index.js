import express from 'express';
import { catchAsync } from '../../../../utils';
import { commonController } from '../../../../controllers';

const router = express.Router();

router.post('/upload', catchAsync(commonController.uploadImage));

// router.get('/get', catchAsync(commonController.getImage));

// router.delete('/remove', catchAsync(commonController.removeImage));

export default router;
