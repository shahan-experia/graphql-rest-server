import 'dotenv/config';

import chai from 'chai';
import { BASE_URL } from '../../config';
import { adminAuth } from '../helper';
import { auth } from '../../utils';
import chaiHttp from 'chai-http';
import app from '../..';

chai.use(chaiHttp);

const { expect } = chai;

describe('Admin Authentication routes APIs', function () {
	this.timeout(0);
	this.slow(1000);

	before(async () => {
		await auth.signOut('adminToken');
	});

	it(`${BASE_URL}/api/admin/auth/logout => DEL => should success`, async () => {
		try {
			const { body } = await adminAuth.login();

			const { error, text } = await adminAuth.logout(body.token);

			expect(error).to.be.false;
			expect(text).to.be.a.string("You've successfully signed out.");
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/logout => DEL => should fail`, async () => {
		try {
			const { error, text } = await adminAuth.logout();

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('You need to sign in.');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/login => POST => should fail`, async () => {
		try {
			const { error, text } = await adminAuth.login('shahan', 'wrong-password');

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('Not Authenticated');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/login => POST => should fail`, async () => {
		try {
			const { error, text } = await adminAuth.login('wrong-username', '123abc456');

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('Not Authenticated');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/login => POST => should success`, async () => {
		try {
			const { body, error } = await adminAuth.login();

			expect(error).to.be.false;
			['token', 'admin'].map((prop) => expect(body).to.have.property(prop));
			expect(body.admin).to.be.an('object');
			expect(body.admin).not.have.property('password');
			['id', 'username', 'role'].map((prop) => expect(body.admin).to.have.property(prop));
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		} finally {
			await auth.signOut('adminToken');
		}
	});

	it(`${BASE_URL}/api/admin/auth/login => POST => should fail`, async () => {
		try {
			await adminAuth.login();

			const { error, text } = await adminAuth.login();

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('You need to sign out.');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		} finally {
			await auth.signOut('adminToken');
		}
	});

	it(`${BASE_URL}/api/admin/auth/me => GET => should success`, async () => {
		try {
			const { body: loginBody } = await adminAuth.login();

			const { body, error } = await adminAuth.me(loginBody.token);

			expect(error).to.be.false;
			expect(body).not.have.property('password');
			['id', 'username', 'role'].map((prop) => expect(body).to.have.property(prop));
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		} finally {
			await auth.signOut('adminToken');
		}
	});

	it(`${BASE_URL}/api/admin/auth/me => GET => should fail`, async () => {
		try {
			const { error, text } = await adminAuth.me();

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('You need to sign in.');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});

	it(`${BASE_URL}/api/admin/auth/change-password => PUT => should fail`, async () => {
		try {
			const { body: loginBody } = await adminAuth.login();

			const { error, text } = await chai
				.request(app)
				.put('/api/admin/auth/change-password')
				.set('content-type', 'application/json')
				.set('Authorization', `Bearer ${loginBody.token}`)
				.field('oldPassword', 'wrong-password')
				.field('password', 'shahan');

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('Old password mismatched');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		} finally {
			await auth.signOut('adminToken');
		}
	});

	it(`${BASE_URL}/api/admin/auth/change-password => PUT => should fail`, async () => {
		try {
			const { body: loginBody } = await adminAuth.login();

			const { error, text } = await chai
				.request(app)
				.put('/api/admin/auth/change-password')
				.set('content-type', 'application/json')
				.set('Authorization', `Bearer ${loginBody.token}`)
				.field('oldPassword', 'shahan')
				.field('password', 'shahan');

			expect(error).to.be.an.instanceOf(Error);
			expect(text).to.be.a.string('Your new password cannot be same as the old one');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		} finally {
			await auth.signOut('adminToken');
		}
	});

	it(`${BASE_URL}/api/admin/auth/change-password => PUT => should success`, async () => {
		try {
			const { body: loginBody } = await adminAuth.login();

			const { error, text } = await chai
				.request(app)
				.put('/api/admin/auth/change-password')
				.set('content-type', 'application/json')
				.set('Authorization', `Bearer ${loginBody.token}`)
				.field('oldPassword', 'shahan')
				.field('password', 'shahan1');

			expect(error).to.be.false;
			expect(text).to.be.a.string('Password changed successfully');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		} finally {
			await auth.signOut('adminToken');
		}
	});

	it(`${BASE_URL}/api/admin/auth/change-password => PUT => should success`, async () => {
		try {
			const { body: loginBody } = await adminAuth.login('shahan', 'shahan1');

			const { error, text } = await chai
				.request(app)
				.put('/api/admin/auth/change-password')
				.set('content-type', 'application/json')
				.set('Authorization', `Bearer ${loginBody.token}`)
				.field('oldPassword', 'shahan1')
				.field('password', 'shahan');

			expect(error).to.be.false;
			expect(text).to.be.a.string('Password changed successfully');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		} finally {
			await auth.signOut('adminToken');
		}
	});
});
