import { adminController } from '../../../controllers';

const admin = {
	loginAdmin: (...args) => adminController.loginAdmin(...args),
	logoutAdmin: (...args) => adminController.logoutAdmin(...args),
};

export default admin;
