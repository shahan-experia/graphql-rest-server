import { signOut } from '../../utils';

function logoutAdmin() {
	return signOut('adminToken');
}

export default logoutAdmin;
