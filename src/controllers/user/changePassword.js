import bcrypt from 'bcryptjs';
import { prisma } from '../../library';
import { BCRYPT_SALT } from '../../config';
import { validations } from '../../utils';

async function changePassword(root, args, ctx) {
	await validations.validate(validations.schemas.user.changePassword, args);

	const user = await prisma.user.findUnique({ where: { id: ctx.req.user.id } });

	if (!bcrypt.compareSync(args.oldPassword, user.password)) {
		throw new Error('409;;Old password mismatched');
	}

	if (bcrypt.compareSync(args.password, user.password)) {
		throw new Error('409;;Your new password cannot be same as the old one');
	}

	await prisma.user.update({
		where: { id: ctx.req.user.id },
		data: { password: bcrypt.hashSync(args.password, BCRYPT_SALT) },
	});

	return 'Password changed successfully';
}

export default changePassword;
