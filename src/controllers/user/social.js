import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { redis } from '../../library';
import { validations, auth } from '../../utils';

async function social(root, args, ctx) {
	await validations.validate(validations.schemas.user.social, args);

	const user = await auth.firebaseAuth(args.firebaseToken);

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

	await redis.set('userToken', `Bearer ${token}`);

	return { token, user };
}

export default social;
