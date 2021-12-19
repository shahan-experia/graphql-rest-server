function me(root, args, ctx) {
	const { type, password, ...user } = ctx.req.user;

	return user;
}

export default me;
