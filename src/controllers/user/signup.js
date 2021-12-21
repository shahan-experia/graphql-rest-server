import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { BCRYPT_SALT, JWT_SECRET } from '../../config';
import { prisma, redis } from '../../library';
import { file, validations } from '../../utils';

async function signup(root, args, ctx) {
	await validations.validate(validations.schemas.user.signup, args);

	const { username, avatar } = args;

	const userFound = await prisma.user.findFirst({ where: { username } });
	if (userFound) throw new Error('409;;User already exists with this username');

	args.password = bcrypt.hashSync(args.password, BCRYPT_SALT);
	args.avatar = await file.moveImageFromTmp(avatar);

	const user = await prisma.user.create({ data: args }).then(({ password, ...user }) => user);

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

	await redis.set('userToken', `Bearer ${token}`);

	return { token, user };
}

export default signup;
