import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma, redis } from '../../library';
import { JWT_SECRET } from '../../config';

async function login(root, args, ctx) {
	const user = await prisma.user
		.findFirst({
			where: { username: args.username, isDeleted: { not: true } },
		})
		.then((user) => {
			if (!user || !bcrypt.compareSync(args.password, user.password)) {
				throw new Error('401;;Not Authenticated');
			}

			delete user.password;
			return user;
		});

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

	await redis.set('userToken', `Bearer ${token}`);

	return { token, user };
}

export default login;
