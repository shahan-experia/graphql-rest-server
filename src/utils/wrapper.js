import { catchError } from '.';

export const wrapperController = async function ([req, res], controller) {
	try {
		const root = null;
		let args = { ...req.query, ...req.params, file: req.files };
		if (req.body) args = { ...args, ...req.body };

		const result = await controller(root, args, { req, res });
		res.status(200).send(result);
	} catch (error) {
		const { statusCode, errorMessage } = catchError(error);
		res.status(statusCode).send(errorMessage);
	}
};

export const catchAsync =
	(handler) =>
	(...args) => {
		const [, res] = args;
		return handler(...args).catch((error) => {
			const { statusCode, errorMessage } = catchError(error);
			res.status(statusCode).send(errorMessage);
		});
	};
