import chai from 'chai';
import { auth, logics } from '../../utils';
import { userController, middleware } from '../../controllers';

const { expect } = chai;

describe('User logout controller', function () {
	this.timeout(0);
	this.slow(1000);

	before(async () => {
		await auth.signOut('userToken');
	});

	it('user logout => should success', async () => {
		try {
			const { token } = await userController.login(null, {
				username: 'shahanahmed86',
				password: '123abc4567',
			});

			await middleware.ensureSignIn({ shouldUser: true }, `Bearer ${token}`);

			const result = await userController.logout();

			expect(token).to.be.a('string');
			expect(result).to.be.a.string("You've successfully signed out.");
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it('user logout => should fail', async () => {
		try {
			await middleware.ensureSignIn({ shouldUser: true }).catch((error) => {
				const { errorMessage } = logics.catchError(error);
				expect(errorMessage).to.be.a.string('You need to sign in.');
			});
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});
});
