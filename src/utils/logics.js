import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { redis } from '../library';
import RootUtils from './root';

class Logics extends RootUtils {
	async validateToken(tokenKey, receivedToken) {
		const savedToken = await this.getToken(tokenKey);
		if (!savedToken || !receivedToken) throw new Error('401;;You need to sign in.');
		if (savedToken !== receivedToken) throw new Error('401;;Invalid token found.');

		const [, token] = savedToken.split(' ');
		if (!token) throw new Error('401;;Token is malformed');

		const decoded = jwt.verify(token, JWT_SECRET);
		const now = Date.now() / 1000;

		if (decoded.exp < now) throw new Error('401;;Session Expired.');

		return decoded;
	}

	getToken(tokenKey) {
		return redis.get(tokenKey);
	}
}

export default new Logics();
