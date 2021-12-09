import { prisma } from '../library';
import { validateToken, getToken } from '../utils';

export const ensureSignedIn = async (req, res, next) => {
	try {
		const adminId = await validateToken('token');

		const user = await prisma.admin.findUnique({ where: { id: adminId } });
		if (!user) throw new Error('Not Authenticated');

		req.user = { ...user, type: 'portal' };

		next();
	} catch (error) {
		res.status(401).send(error.message || 'Not Authenticated');
	}
};

export const ensureSignedOut = async (req, res, next) => {
	try {
		const token = await getToken('token');
		if (token) throw new Error('You need to sign out');

		next();
	} catch (error) {
		res.status(401).send(error.message || 'Not Authenticated');
	}
};
