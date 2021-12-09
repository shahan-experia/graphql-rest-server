export async function wrapperController([req, res], controller, canTriggerRest = false) {
	try {
		const root = null;
		let args = { ...req.query, ...req.params, file: req.files };
		if (req.body) args = { ...args, ...req.body };

		const result = await controller(root, args, { req, res });
		res.status(200).send(result);
	} catch (error) {
		res.status(409).send(error.message || 'Something went wrong');
	}
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
