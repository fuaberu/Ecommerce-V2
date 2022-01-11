import express, { Errback } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';

//import routes
import ProductsRoutes from './routes/productsRoute';
import { errorHandling } from './utils/error';

const app = express();

app.use(express.json());

//config
dotenv.config({ path: 'backend/config/config.env' });

//connect to database
process.env.MONGO_URL &&
	connect(process.env.MONGO_URL, () => {
		console.log('Mongo connected');
	});

//routes
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/api/products', ProductsRoutes);

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
