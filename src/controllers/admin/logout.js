import { auth } from '../../utils';

function logout() {
	return auth.signOut('adminToken');
}

export default logout;
