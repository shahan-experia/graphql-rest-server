import { adminController } from '../../../controllers';
import { graphqlWrapper } from '../../../utils';

const admin = {
	loginAdmin: (...args) => graphqlWrapper(args, adminController.login),
	logoutAdmin: (...args) => graphqlWrapper(args, adminController.logout),
};

export default admin;
