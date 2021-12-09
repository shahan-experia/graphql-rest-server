import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { redis } from '../library';

export async function validateToken(tokenKey) {
	const token = await getToken(tokenKey);
	if (!token) throw new Error('You need to sign in.');

	const decoded = jwt.verify(token, JWT_SECRET);
	const now = Date.now() / 1000;

	if (decoded.exp < now) throw new Error('Session Expired.');

	return decoded.adminId;
}

export function getToken(tokenKey) {
	return redis.get(tokenKey);
}
