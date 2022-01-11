import { NextFunction, Request, Response } from 'express';
import { Query } from 'mongoose';
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
export const getAllProducts = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, page, limit, minPrice, maxPrice, category, rating } = req.query;

		//check for request query types
		if (name && typeof name !== 'string')
			return next(ApiError.wrongType(`${name} is not of the type String`));
		if (page && typeof page !== 'string')
			return next(ApiError.wrongType(`${page} is not of the type String`));
		if (limit && typeof limit !== 'string')
			return next(ApiError.wrongType(`${limit} is not of the type String`));
		if (minPrice && typeof minPrice !== 'string')
			return next(ApiError.wrongType(`${minPrice} is not of the type String`));
		if (maxPrice && typeof maxPrice !== 'string')
			return next(ApiError.wrongType(`${maxPrice} is not of the type String`));
		if (category && typeof category !== 'string')
			return next(ApiError.wrongType(`${category} is not of the type String`));
		if (rating && typeof rating !== 'string')
			return next(ApiError.wrongType(`${rating} is not of the type String`));

		//pagination variables
		const pageIndex = page ? parseInt(page) : 0;
		const limitNum = limit ? parseInt(limit) : 10;
		const skip = pageIndex * limitNum;

		//initial mongodb query
		let query: {
			$and: any[];
		} = { $and: [] };

		//querys variables
		const minPriceNum = minPrice && parseInt(minPrice);
		const maxPriceNum = maxPrice && parseInt(maxPrice);
		const ratingNum = rating && parseInt(rating);

		if (name) query.$and.push({ name: new RegExp(name, 'i') });
		if (category) query.$and.push({ category: category });
		if (minPrice) query.$and.push({ price: { $gte: minPriceNum } });
		if (maxPrice) query.$and.push({ price: { $lte: maxPriceNum } });
		if (rating) query.$and.push({ rating: { $gte: ratingNum } });

		//check if there is any query
		const mongoQuery = query.$and.length > 0 ? query : {};

		const products = await productModel.find(mongoQuery).skip(skip).limit(limitNum);

		if (!products.length) {
			return next(ApiError.badRequest('No Products Were Found'));
		}

		const nextPage =
			products.length - (pageIndex + 1) * limitNum > 0 ? pageIndex + 2 : null;

		res.status(200).json({ success: true, products, page: pageIndex + 1, nextPage });
	}
);
