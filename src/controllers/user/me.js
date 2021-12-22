import { logics } from '../../utils';

function me(root, args, ctx) {
	return logics.excludePropsFromUser(ctx.req.user);
}

export default me;
