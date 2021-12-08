import { AuthenticationError } from 'apollo-server-errors';
import { signOut } from '../../utils';

async function me(root, args, ctx) {
	if (!ctx.req.session.adminId) throw new AuthenticationError("You've already signed out");
	return signOut(ctx);
}

export default me;
