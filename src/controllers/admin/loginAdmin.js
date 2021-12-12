const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-errors');
const { prisma, redis } = require('../../library');
const { JWT_SECRET } = require('../../config');

async function loggedInAdmin(root, args, ctx) {
	const admin = await prisma.admin.findFirst({ where: { username: args.username } });
	if (!admin) throw new ApolloError('Not authenticated');

	if (!bcrypt.compareSync(args.password, admin.password)) {
		throw new ApolloError('Not authenticated');
	}

	const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '1h' });

	await redis.set('adminToken', token);

	return admin;
}

module.exports = loggedInAdmin;
