import 'dotenv/config';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../';

chai.use(chaiHttp);

export function adminLogin(username = 'shahan', password = 'shahan') {
	return chai
		.request(app)
		.post(`/api/admin/auth/login`)
		.set('content-type', 'application/json')
		.field('username', username)
		.field('password', password);
}

export function me() {
	return chai.request(app).get(`/api/admin/auth/me`).set('content-type', 'application/json');
}

export function adminLogout() {
	return chai.request(app).delete(`/api/admin/auth/logout`).set('content-type', 'application/json');
}
