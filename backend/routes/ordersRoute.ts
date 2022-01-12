import { Router } from 'express';
import {
	createOrder,
	deleteOrder,
	getAllOrders,
	getMyOrders,
	getOrder,
	updateOrderStatus,
} from '../controllers/orderController';
import { authorizedRoles, isAuthenticated } from '../utils/isAuth';

const OrdersRoutes = Router();

//ADMIN AREA
OrdersRoutes.get('/get/:id', isAuthenticated, authorizedRoles('admin'), getOrder);
OrdersRoutes.get('/all', isAuthenticated, authorizedRoles('admin'), getAllOrders);
OrdersRoutes.put(
	'/update/:id',
	isAuthenticated,
	authorizedRoles('admin'),
	updateOrderStatus
);
OrdersRoutes.delete(
	'/delete/:id',
	isAuthenticated,
	authorizedRoles('admin'),
	deleteOrder
);

//AUTHENTICATED AREA
OrdersRoutes.post('/new', isAuthenticated, createOrder);
OrdersRoutes.get('/me', isAuthenticated, getMyOrders);

//ALL USERS AREA

export default OrdersRoutes;
