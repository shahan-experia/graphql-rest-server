import { redis } from '../library';

export function signOut(tokenKey) {
	return new Promise((resolve, reject) => {
		redis
			.del(tokenKey)
			.then(() => resolve("You've successfully signed out."))
			.catch(reject);
	});
}
