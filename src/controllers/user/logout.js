import { auth } from '../../utils';

function logout() {
	return auth.signOut('userToken');
}

export default logout;
