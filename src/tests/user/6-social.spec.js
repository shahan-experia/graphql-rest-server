import chai from 'chai';
import { auth, logics } from '../../utils';
import { userController } from '../../controllers';

const { expect } = chai;

describe('User social controller', function () {
	this.timeout(0);
	this.slow(1000);

	before(async () => {
		await auth.signOut('userToken');
	});

	it('user social => should failed', async () => {
		try {
			await userController.social(null, {}).catch((error) => {
				const { errorMessage } = logics.catchError(error);
				expect(errorMessage).to.be.a.string('Firebase Token is a required field');
			});

			await userController.social(null, { firebaseToken: '' }).catch((error) => {
				const { errorMessage } = logics.catchError(error);
				expect(errorMessage).to.be.a.string('Firebase Token cannot be an empty field');
			});
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});
});
