import { Router } from 'express';
import {
	createProduct,
	createReview,
	deleteProduct,
	deleteReview,
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
ProductsRoutes.post('/review', isAuthenticated, createReview);
ProductsRoutes.delete('/review', isAuthenticated, deleteReview);

//ALL USERS AREA
ProductsRoutes.get('/', getAllProducts);
ProductsRoutes.get('/:productId', getProduct);

export default ProductsRoutes;
