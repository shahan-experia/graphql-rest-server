import 'dotenv/config';

import chai from 'chai';
import { BASE_URL } from '../../config';
import { auth } from '../helper';
import { signOut } from '../../utils';

const { expect } = chai;

describe('Admin Authentication routes APIs', function () {
	this.timeout(0);
	this.slow(2000);

	it(`${BASE_URL}/api/admin/auth/login => POST => should fail`, async () => {
		await signOut('adminToken');

		const { error } = await auth.adminLogin('shahan', 'wrong-password');

		expect(error).to.be.be.an.instanceOf(Error);
		expect(error.text).to.be.a.string('Not Authenticated');
	});
});
