import { Router } from 'express';
import {
	createProduct,
	createReview,
	deleteProduct,
	getAllProducts,
	getProduct,
	udpateProduct,
} from '../controllers/productController';
import { authorizedRoles, isAuthenticated } from '../utils/isAuth';

const ProductsRoutes = Router();

//ADMIN AREA
ProductsRoutes.post(
	'/admin/new',
	isAuthenticated,
	authorizedRoles('admin'),
	createProduct
);

ProductsRoutes.put(
	'/admin/:productId',
	isAuthenticated,
	authorizedRoles('admin'),
	udpateProduct
);
ProductsRoutes.delete(
	'/admin/:productId',
	isAuthenticated,
	authorizedRoles('admin'),
	deleteProduct
);

//AUTHENTICATED AREA
ProductsRoutes.delete('/review', isAuthenticated, createReview);

//ALL USERS AREA
ProductsRoutes.get('/', getAllProducts);
ProductsRoutes.get('/:productId', getProduct);

export default ProductsRoutes;
