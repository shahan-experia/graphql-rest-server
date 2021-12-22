const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
	try {
		const data = {
			username: 'shahan',
			password: bcrypt.hashSync('shahan', 10),
			role: 'SYSTEM',
		};
		let user = await prisma.admin.findFirst({ where: { username: 'shahan' } });
		if (!user) user = await prisma.admin.create({ data });

		delete user.password;
		console.log('prisma seeds.......... : ', user);
		return user;
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
})();
