import express, { Errback } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { errorHandling } from './utils/error';
//import routes
import ProductsRoutes from './routes/productsRoute';
import UserRoutes from './routes/userRoute';
import OrdersRoutes from './routes/ordersRoute';
import PaymentRoutes from './routes/paymentRoute';

const app = express();

//config
dotenv.config({ path: 'backend/config/config.env' });

//connect to database
process.env.MONGO_URL &&
	connect(process.env.MONGO_URL, () => {
		console.log('Mongo connected');
	});

//middlewares
app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:3000'],
		methods: 'GET,PUT,POST,DELETE',
	})
);
app.use(express.json());
app.use(cookieParser());

//routes
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/api/products', ProductsRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/orders', OrdersRoutes);
app.use('/api/payment', PaymentRoutes);

//error handling
app.use(errorHandling);

const server = app.listen(process.env.PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`);
});

//if can not handle async rejection close server
process.on('unhandledRejection', (err: any) => {
	console.log(`Error: ${err.message}`);
	console.log('Shutting down server due to unhandledRejection');

	server.close(() => {
		process.exit(1);
	});
});
