import { validations, auth } from '../../utils';

async function social(root, args, ctx) {
	await validations.validate(validations.schemas.user.social, args);

	return auth.firebaseAuth(args.firebaseToken);
}

export default social;
