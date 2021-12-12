async function me(root, args, ctx) {
	const { type, ...user } = ctx.req.user;
	return user;
}

module.exports = me;
