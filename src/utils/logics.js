import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { redis } from '../library';

export async function validateToken(tokenKey, receivedToken) {
	const savedToken = await getToken(tokenKey);
	if (!savedToken) throw new Error('401;;You need to sign in.');
	if (savedToken !== receivedToken) throw new Error('401;;Invalid token found.');

	const [, token] = savedToken.split(' ');
	const decoded = jwt.verify(token, JWT_SECRET);
	const now = Date.now() / 1000;

	if (decoded.exp < now) throw new Error('401;;Session Expired.');

	return decoded;
}

export function getToken(tokenKey) {
	return redis.get(tokenKey);
}

export function catchError(error) {
	let statusCode = 409;
	let errorMessage = 'Something went wrong';

	if (error.message.indexOf(';;') === -1) errorMessage = error.message;
	else [statusCode, errorMessage] = error.message.split(';;');

	return { statusCode, errorMessage };
}
