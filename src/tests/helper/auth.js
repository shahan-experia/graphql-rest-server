import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../';

chai.use(chaiHttp);

export async function adminLogin(username = 'shahan', password = 'shahan') {
	return server.then(async (app) => {
		const result = await chai
			.request(app)
			.post(`/api/admin/auth/login`)
			.set('content-type', 'application/json')
			.field('username', username)
			.field('password', password);

		return result;
	});
}
