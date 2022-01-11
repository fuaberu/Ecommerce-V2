import { NextFunction, Request, Response } from 'express';
import productModel from '../models/productModel';
import ApiError from '../utils/apiError';
import catchAsyncError from '../utils/error';

//create Product - admin
export const createProduct = catchAsyncError(async (req: Request, res: Response) => {
	const product = await productModel.create(req.body);
	res.status(200).json({ success: true, product });
});

//update product - admin
export const udpateProduct = catchAsyncError(async (req: Request, res: Response) => {
	const exists = await productModel.findById(req.params.productId);

	if (!exists) {
		return res.status(500).json({ success: false, message: 'Product not found' });
	}
	const product = await productModel.findByIdAndUpdate(req.params.productId, req.body, {
		returnOriginal: false,
		runValidators: true,
	});
	res.status(200).json({ success: true, product });
});

//delete Product - admin
export const deleteProduct = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const product = await productModel.findById(req.params.productId);

		if (!product) {
			return next(ApiError.badRequest('Product not found'));
		}
		await product.remove();
		res.status(200).json({ success: true, message: 'Product deleted successfully' });
	}
);

//get a product
export const getProduct = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const product = await productModel.findById(req.params.productId);

		if (!product) {
			return next(ApiError.badRequest('Product not found'));
		}
		await product.remove();
		res.status(200).json({ success: true, product });
	}
);

//get all products
export const getAllProducts = catchAsyncError(async (req: Request, res: Response) => {
	const products = await productModel.find();
	res.status(200).json({ success: true, products });
});
