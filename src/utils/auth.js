import { redis } from '../library';

export function signOut(tokenKey) {
	return new Promise((resolve, reject) => {
		redis
			.del(tokenKey)
			.then(() => resolve("You've successfully signed out."))
			.catch(reject);
	});
}

export function catchError(error) {
	let statusCode = 409;
	let errorMessage = 'Something went wrong';

	if (error.message.indexOf(';;') === -1) errorMessage = error.message;
	else [statusCode, errorMessage] = error.message.split(';;');

	return { statusCode, errorMessage };
}
