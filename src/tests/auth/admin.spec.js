const chai = require('chai');
const { BASE_URL } = require('../../config');
const { auth } = require('../helper');

const { expect } = chai;

describe('Admin Authentication routes APIs', function () {
	this.timeout(0);
	this.slow(2000);

	it(`${BASE_URL}/api/admin/auth/login => POST => should fail`, async () => {
		try {
			await auth.adminLogin('shahan', 'wrong-password');
			expect(true).to.be.be.false;
		} catch (error) {
			expect(true).to.be.be.false;
		}
	});
});
