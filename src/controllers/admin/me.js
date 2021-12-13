function me(root, args, ctx) {
	const { type, ...user } = ctx.req.user;
	return user;
}

export default me;
