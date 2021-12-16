import { adminController } from '../../../controllers';
import { graphqlWrapper } from '../../../utils';

const admin = {
	me: (...args) => graphqlWrapper(args, adminController.me),
};

export default admin;
