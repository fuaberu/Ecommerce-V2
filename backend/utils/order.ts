import productModel from '../models/productModel';

export const subtractStock = async (id: string, quantity: number) => {
	const product = await productModel.findById(id);

	if (!product) return;

	product.stock -= quantity;

	await product.save();
};
