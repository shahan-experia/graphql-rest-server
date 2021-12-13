import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-errors';
import { prisma, redis } from '../../library';
import { JWT_SECRET } from '../../config';

async function loggedInAdmin(root, args, ctx) {
	const admin = await prisma.admin.findFirst({ where: { username: args.username } });
	if (!admin) throw new ApolloError('Not Authenticated');

	if (!bcrypt.compareSync(args.password, admin.password)) {
		throw new ApolloError('Not Authenticated');
	}

	const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '1h' });

	await redis.set('adminToken', token);

	return admin;
}

export default loggedInAdmin;
