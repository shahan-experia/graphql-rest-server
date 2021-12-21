import 'dotenv/config';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';

chai.use(chaiHttp);

export function login(username = 'test-user', password = '123abc456') {
	return chai
		.request(app)
		.post(`/api/user/auth/login`)
		.set('content-type', 'application/json')
		.field('username', username)
		.field('password', password);
}

export function me(token) {
	return chai
		.request(app)
		.get(`/api/user/auth/me`)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`);
}

export function logout(token) {
	return chai
		.request(app)
		.delete(`/api/user/auth/logout`)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`);
}
