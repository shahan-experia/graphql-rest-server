import express from 'express';
import { catchAsync } from '../../../utils';

const router = express.Router();

router.get('/', catchAsync((req, res) => {
  res.status(200).send('Hello world')
}))

export default router;