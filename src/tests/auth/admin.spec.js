import 'dotenv/config';

import chai from 'chai';
import { BASE_URL } from '../../config';
import { auth } from '../helper';
import { signOut } from '../../utils';

const { expect } = chai;

describe('Admin Authentication routes APIs', function () {
	this.timeout(0);
	this.slow(1000);

	before(async () => {
		await signOut('adminToken');
	});

	it(`${BASE_URL}/api/admin/auth/logout => DEL => should success`, async () => {
		try {
			await auth.adminLogin();

			const { error, text } = await auth.adminLogout();

			expect(error).to.be.be.false;
			expect(text).to.be.a.string("You've successfully signed out.");
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/logout => DEL => should fail`, async () => {
		try {
			const { error, text } = await auth.adminLogout();

			expect(error).to.be.be.an.instanceOf(Error);
			expect(text).to.be.a.string('You need to sign in.');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/login => POST => should fail`, async () => {
		try {
			const { error, text } = await auth.adminLogin('shahan', 'wrong-password');

			expect(error).to.be.be.an.instanceOf(Error);
			expect(text).to.be.a.string('Not Authenticated');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/login => POST => should fail`, async () => {
		try {
			const { error, text } = await auth.adminLogin('wrong-username', '123abc456');

			expect(error).to.be.be.an.instanceOf(Error);
			expect(text).to.be.a.string('Not Authenticated');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/login => POST => should success`, async () => {
		try {
			const { body, error } = await auth.adminLogin();

			expect(error).to.be.be.false;
			expect(body).to.be.an('object');
			expect(body).not.have.property('password');
			['id', 'username', 'role'].map((prop) => expect(body).to.have.property(prop));
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/login => POST => should fail`, async () => {
		try {
			const { error, text } = await auth.adminLogin();

			expect(error).to.be.be.an.instanceOf(Error);
			expect(text).to.be.a.string('You need to sign out.');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/me => GET => should success`, async () => {
		try {
			const { body, error } = await auth.me();

			expect(error).to.be.be.false;
			expect(body).to.be.an('object');
			expect(body).not.have.property('password');
			['id', 'username', 'role'].map((prop) => expect(body).to.have.property(prop));
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/me => GET => should fail`, async () => {
		try {
			await signOut('adminToken');

			const { error, text } = await auth.me();

			expect(error).to.be.be.an.instanceOf(Error);
			expect(text).to.be.a.string('You need to sign in.');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	after(async () => {
		// await signOut('adminToken');
	});
});
