import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-errors';
import { prisma } from '../../library';

async function login(root, args, ctx) {
	if (ctx.req.session.adminId) throw new ApolloError("You've already signed in");
	
	const admin = await prisma.admin.findFirst({ where: { username: args.username } });
	if (!admin) throw new ApolloError('Not authenticated');

	if (!bcrypt.compareSync(args.password, admin.password)) {
		throw new ApolloError('Not authenticated');
	}

	ctx.req.session.adminId = admin.id;

	return admin;
}

export default login;
