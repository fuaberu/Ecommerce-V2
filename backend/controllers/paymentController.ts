import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError';
import catchAsyncError from '../utils/error';
import Stripe from 'stripe';

//initiate stripe
const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
	apiVersion: '2020-08-27',
});

export const processPayment = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { amount, currency } = req.body;
		const myPayment = await stripe.paymentIntents.create({
			amount,
			currency,
			metadata: { company: 'Ecommerce' },
		});

		res.status(200).json({ success: true, client_secret: myPayment.client_secret });
	}
);
export const sendStripePublicKey = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		res.status(200).json({ stripeApiKey: process.env.STRIPE_KEY });
	}
);
