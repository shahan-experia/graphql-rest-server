import { SESSION_NAME } from '../../config';

export function signOut({ req, res }) {
	return new Promise((resolve, reject) => {
		req.session.destroy((err) => {
			if (err) reject(err);

			res.clearCookie(SESSION_NAME);

			resolve(true);
		});
	});
}
