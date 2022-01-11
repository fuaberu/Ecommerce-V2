import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import ApiError from './apiError';

export const errorHandling: ErrorRequestHandler = (
	err,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ApiError) {
		return res.status(err.code).json({ success: false, message: err.message });
	}
	res.status(500).json({ success: false, message: 'Internal Server Error' });
};

export default (catchAsyncError: any) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(catchAsyncError(req, res, next)).catch((err) =>
			next(ApiError.badRequest(err.message))
		);
	};
