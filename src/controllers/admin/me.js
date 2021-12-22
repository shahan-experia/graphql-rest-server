import { logics } from '../../utils';

function me(root, args, ctx) {
	return logics.excludePropsFromAdmin(ctx.req.user);
}

export default me;
