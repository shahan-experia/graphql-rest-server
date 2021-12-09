import { signOut } from '../../utils';

async function logoutAdmin(root, args, ctx) {
	return signOut('token');
}

export default logoutAdmin;
