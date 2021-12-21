import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma, redis } from '../../library';
import { JWT_SECRET } from '../../config';
import { validations } from '../../utils';

async function login(root, args, ctx) {
	await validations.validate(validations.schemas.admin.login, args);

	const admin = await prisma.admin
		.findFirst({
			where: { username: args.username },
		})
		.then((admin) => {
			if (!admin || !bcrypt.compareSync(args.password, admin.password)) {
				throw new Error('401;;Not Authenticated');
			}

			delete admin.password;
			return admin;
		});

	const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '1h' });

	await redis.set('adminToken', `Bearer ${token}`);

	return { token, admin };
}

export default login;
