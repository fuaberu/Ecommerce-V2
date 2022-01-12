import { CookieOptions, Response } from 'express';

const sendToken = (user: any, res: Response) => {
	//return the cookie
	const token = user.getJWTToken();

	//expire in 2 days
	const cookieExpireDate = Date.now() + 2 * 24 * 60 * 60 * 1000;

	const options: CookieOptions = {
		httpOnly: true,
		expires: new Date(cookieExpireDate),
	};

	res.cookie('access_token', token, options).status(201).json({
		success: true,
		token,
		user,
	});
};

export default sendToken;
