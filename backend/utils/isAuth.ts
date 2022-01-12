import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import userModel from '../models/userModel';
import ApiError from './apiError';
import catchAsyncError from './error';
import * as jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
	export interface UserIDJwtPayload extends jwt.JwtPayload {
		id: string;
	}
}

export const isAuthenticated = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies.access_token;

		if (!token) {
			return next(ApiError.badRequest('Please Login to access this resource'));
		}

		if (!process.env.JWT_SECRET) return next(ApiError.badRequest('Internal Error'));

		//if there is a token check if is valid
		const { id } = <jwt.UserIDJwtPayload>verify(token, process.env.JWT_SECRET);

		if (!id) return next(ApiError.badRequest('Please Login to access this resource'));
		res.locals.user = await userModel.findById(id);
		next();
	}
);

export const authorizedRoles = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!roles.includes(res.locals.user.role)) {
			next(
				ApiError.badRequest(
					`This Resoures is not allowed by user ${res.locals.user._id} Role`
				)
			);
		}
		next();
	};
};
