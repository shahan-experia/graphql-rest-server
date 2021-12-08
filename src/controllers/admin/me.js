import { AuthenticationError } from 'apollo-server-errors';
import { prisma } from '../../library';

async function me(root, args, ctx) {
	if (!ctx.req.session.adminId) throw new AuthenticationError("You need to sign in");

	return prisma.admin.findUnique({ where: { id: ctx.req.session.adminId } });
}

export default me;
