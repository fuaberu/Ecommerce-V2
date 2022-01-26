import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import catchAsyncError from "../utils/error";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

//initiate stripe
const stripeEnvKey = process.env.STRIPE_SECRET as string;
const stripe = new Stripe(stripeEnvKey, {
  apiVersion: "2020-08-27",
});

//process frontend request
export const processPayment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount, currency } = req.body;
    console.log(amount, currency);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
    res
      .status(200)
      .json({ success: true, client_secret: paymentIntent.client_secret });
  }
);

export const sendStripePublicKey = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_KEY });
  }
);
