import { adminController } from '../../../controllers';
import { graphqlWrapper } from '../../../utils';

const admin = {
	loginAdmin: (...args) => graphqlWrapper(args, adminController.loginAdmin),
	logoutAdmin: (...args) => graphqlWrapper(args, adminController.logoutAdmin),
};

export default admin;
