import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	udpateProduct,
} from '../controllers/productController';

const ProductsRoutes = Router();

ProductsRoutes.post('/new', createProduct);

ProductsRoutes.put('/:productId', udpateProduct)
	.delete('/:productId', deleteProduct)
	.get('/:productId', getProduct);

ProductsRoutes.get('/', getAllProducts);

export default ProductsRoutes;
