import { Document, model, Schema, Types } from 'mongoose';

export interface IOrder extends Document {
	_id: Types.ObjectId;
	shippingInfo: {
		address: string;
		city: string;
		state: string;
		country: string;
		zipCode: number;
		phoneNumber: number;
	};
	orderItems: {
		name: string;
		price: number;
		quantity: number;
		image: string;
		productId: Types.ObjectId;
	}[];
	user: Types.ObjectId;
	paymentInfo: { id: string; status: string };
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	orderStatus: string;
	paidAt: Date;
	deliveredAt: Date;
	createdAt: Date;
}

const orderSchema = new Schema({
	shippingInfo: {
		address: {
			type: String,
			required: [true, 'Please Enter The Product Shipping Address'],
		},
		city: {
			type: String,
			required: [true, 'Please Enter The Product Shipping city name'],
		},
		state: {
			type: String,
			required: [true, 'Please Enter The Product Shipping State'],
		},
		country: {
			type: String,
			required: [true, 'Please Enter The Product Shipping country'],
		},
		zipCode: {
			type: Number,
			required: [true, 'Please Enter The Product Shipping Zip code'],
		},
		phoneNumber: {
			type: Number,
			required: [true, 'Please Enter your Phone Number'],
		},
	},
	orderItems: [
		{
			name: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			image: {
				type: String,
				required: true,
			},
			productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
		},
	],
	user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	paymentInfo: {
		id: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	taxPrice: {
		type: Number,
		required: true,
	},
	shippingPrice: {
		type: Number,
		required: true,
		default: 0,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	orderStatus: {
		type: String,
		required: true,
	},
	paidAt: { type: Date, required: true },
	deliveredAt: { type: Date },
	createdAt: { type: Date, default: Date.now },
});

export default model<IOrder>('Order', orderSchema);
