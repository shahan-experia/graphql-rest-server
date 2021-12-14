import { prisma } from '../library';
import { validateToken, getToken } from '../utils';

export async function ensureSignIn({ shouldAdmin, shouldUser }) {
	let tokenKey;
	if (shouldAdmin) tokenKey = 'adminToken';
	else if (shouldUser) tokenKey = 'userToken';

	const { adminId, userId } = await validateToken(tokenKey);

	let data;
	if (adminId) {
		const user = await prisma.admin.findUnique({ where: { id: adminId } });
		if (!user) throw new Error('401;;Not Authenticated');

		data = { ...user, type: 'admin' };
	} else if (userId) {
		const user = await prisma.user.findUnique({ where: { id: userId } });
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

	const tokenFound = await getToken(tokenKey);
	if (tokenFound) throw new Error('403;;You need to sign out.');
}
