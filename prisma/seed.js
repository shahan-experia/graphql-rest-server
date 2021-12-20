const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
	try {
		return prisma.admin
			.upsert({
				where: { username: 'shahan' },
				update: {},
				create: {
					username: 'shahan',
					password: bcrypt.hashSync('shahan', 10),
					role: 'SYSTEM',
				},
			})
			.then(console.log);
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
})();
