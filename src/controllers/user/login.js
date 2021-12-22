import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma, redis } from '../../library';
import { JWT_SECRET } from '../../config';
import { logics } from '../../utils';

async function login(root, args, ctx) {
	const user = await prisma.user.findFirst({
		where: { username: args.username, ...logics.includePreWhere },
	});
	if (!user || !bcrypt.compareSync(args.password, user.password)) {
		throw new Error('401;;Not Authenticated');
	}

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

	await redis.set('userToken', `Bearer ${token}`);

	return { token, user: logics.excludePropsFromUser(user) };
}

export default login;
