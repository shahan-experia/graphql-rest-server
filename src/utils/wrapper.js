export function convertToRest(req, res) {
	const root = null;
	let args = { ...req.query, ...req.params, file: req.files };
	if (req.body) args = { ...args, ...req.body };
	const ctx = { req, res };
	return [root, args, ctx];
}

export const catchAsync =
	(handler) =>
	(...args) => {
		const [, res] = args;
		return handler(...args).catch((error) => {
			console.error('catch in catchAsync', error);
			return res.status(500).send(error.message || 'An error occurred');
		});
	};
