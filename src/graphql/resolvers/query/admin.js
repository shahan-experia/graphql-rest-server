import { adminController } from '../../../controllers';

const admin = {
	me: (...args) => adminController.me(...args),
};

export default admin;
