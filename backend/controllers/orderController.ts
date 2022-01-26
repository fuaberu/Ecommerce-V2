import { NextFunction, Request, Response } from 'express';
import orderModel from '../models/orderModel';
import ApiError from '../utils/apiError';
import catchAsyncError from '../utils/error';
import { subtractStock } from '../utils/order';

//------------------- USER -------------------//

//create Oreder
export const createOrder = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const {
			shippingInfo,
			orderItems,
			paymentInfo,
			taxPrice,
			shippingPrice,
			totalPrice,
			orderStatus,
		} = req.body;

		const order = await orderModel.create({
			shippingInfo,
			orderItems,
			paymentInfo,
			taxPrice,
			shippingPrice,
			totalPrice,
			orderStatus,
			paidAt: Date.now(),
			user: res.locals.user._id,
		});
		res.status(200).json({ success: true, order });
	}
);

//get a user orders
export const getMyOrders = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const orders = await orderModel.find({ user: res.locals.user._id });
		if (!orders.length)
			return next(ApiError.badRequest('Current user does not have any orders'));

		res.status(200).json({ success: true, orders });
	}
);

//------------------- ADMIN -------------------//

//get a order
export const getOrder = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const order = await orderModel.findById(req.params.id).populate('user');
		if (!order)
			return next(
				ApiError.badRequest(`Order with id: ${req.params.id} could not be found`)
			);

		res.status(200).json({ success: true, order });
	}
);

//get all orders
export const getAllOrders = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const orders = await orderModel.find();
		if (!orders.length) return next(ApiError.badRequest('Could not find any order'));

		const totalRevenue = orders.reduce((total, order) => total + order.totalPrice, 0);

		res.status(200).json({ success: true, orders, totalRevenue });
	}
);

//update order status
export const updateOrderStatus = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const order = await orderModel.findById(req.params.id);

		if (!order) return next(ApiError.badRequest('Could not find any order'));

		if (order.orderStatus === 'delivered') {
			return next(ApiError.badRequest('Order already delivered'));
		}

		order.orderItems.forEach(async (item) => {
			await subtractStock(item.productId.toString(), item.quantity);
		});

		order.orderStatus = req.body.orderStatus;
		if (req.body.orderStatus === 'delivered') order.deliveredAt = new Date();

		await order.save();

		res.status(200).json({ success: true, message: 'order updated successfully' });
	}
);

//delete order
export const deleteOrder = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const order = await orderModel.findById(req.params.id);

		if (!order) return next(ApiError.badRequest('Could not find any order'));

		await orderModel.findByIdAndDelete(req.params.id);

		res.status(200).json({ success: true, message: 'order deleted successfully' });
	}
);

//
