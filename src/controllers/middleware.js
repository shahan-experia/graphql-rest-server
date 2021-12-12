const { prisma } = require('../library');
const { validateToken, getToken } = require('../utils');

module.exports.ensureSignIn = async function ({ shouldAdmin, shouldUser }) {
	let tokenKey;
	if (shouldAdmin) tokenKey = 'adminToken';
	else if (shouldUser) tokenKey = 'userToken';

	const { adminId, userId } = await validateToken(tokenKey);

	let data;
	if (adminId) {
		const user = await prisma.admin.findUnique({ where: { id: adminId } });
		if (!user) throw new Error('Not Authenticated');

		data = { ...user, type: 'admin' };
	} else if (userId) {
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user) throw new Error('Not Authenticated');

		data = { ...user, type: 'user' };
	} else {
		throw new Error('Not Authenticated');
	}

	return data;
};

module.exports.ensureSignOut = async function ({ shouldAdmin, shouldUser }) {
	let tokenKey;
	if (shouldAdmin) tokenKey = 'adminToken';
	else if (shouldUser) tokenKey = 'userToken';

	const tokenFound = await getToken(tokenKey);
	if (tokenFound) throw new Error('You need to sign out.');
};
