import { Router } from 'express';
import { processPayment, sendStripePublicKey } from '../controllers/paymentController';
import { authorizedRoles, isAuthenticated } from '../utils/isAuth';

const PaymentRoutes = Router();

PaymentRoutes.post('/process', isAuthenticated, processPayment);
PaymentRoutes.get('/key', isAuthenticated, sendStripePublicKey);

export default PaymentRoutes;
