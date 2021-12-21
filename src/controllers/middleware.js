import { prisma } from '../library';
import { logics } from '../utils';

export async function ensureSignIn({ shouldAdmin, shouldUser }, receivedToken) {
	let tokenKey;
	if (shouldAdmin) tokenKey = 'adminToken';
	else if (shouldUser) tokenKey = 'userToken';

	const { adminId, userId } = await logics.validateToken(tokenKey, receivedToken);

	let data;
	if (adminId) {
		const user = await prisma.admin
			.findFirst({
				where: { id: adminId, isDeleted: { not: true } },
			})
			.then(({ password, ...admin }) => admin);
		if (!user) throw new Error('401;;Not Authenticated');

		data = { ...user, type: 'admin' };
	} else if (userId) {
		const user = await prisma.user
			.findFirst({
				where: { id: userId, isDeleted: { not: true } },
			})
			.then(({ password, ...user }) => user);
		if (!user) throw new Error('401;;Not Authenticated');

		data = { ...user, type: 'user' };
	} else {
		throw new Error('401;;Not Authenticated');
	}

	return data;
}

export async function ensureSignOut({ shouldAdmin, shouldUser }) {
	let tokenKey;
	if (shouldAdmin) tokenKey = 'adminToken';
	else if (shouldUser) tokenKey = 'userToken';

	const tokenFound = await logics.getToken(tokenKey);
	if (tokenFound) throw new Error('401;;You need to sign out.');
}
