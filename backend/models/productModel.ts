import { Document, model, Schema, Types } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	stock: number;
	numOfReviews: number;
	reviews: {
		id: Types.ObjectId;
		name: string;
		user: Types.ObjectId;
		comment: string;
		rating: number;
	}[];
	rating: number;
	mainImage: {
		public_id: string;
		url: string;
	};
	detailedImages: {
		public_id: string;
		url: string;
	}[];
	category: string;
	createdAt: Date;
}

const productSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please Enter The Product Name'],
	},
	description: {
		type: String,
		required: [true, 'Please Enter The Product Description'],
	},
	price: {
		type: Number,
		required: [true, 'Please Enter The Product Price'],
	},
	stock: {
		type: Number,
		required: [true, 'Please Enter The Product Stock'],
	},
	numOfReviews: {
		type: Number,
		required: [true, 'Please Enter The Product numOfReviews'],
	},
	reviews: [
		{
			name: { type: String, required: true },
			user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
			comment: { type: String },
			rating: {
				type: Number,
				default: 0,
			},
		},
	],
	rating: {
		type: Number,
		default: 0,
	},
	mainImage: {
		public_id: { type: String, required: [true, 'Please Enter The Product Image'] },
		url: { type: String, required: true },
	},
	detailedImages: [
		{
			public_id: { type: String },
			url: { type: String },
		},
	],
	category: { type: String, required: [true, 'Please Enter The Product Category'] },
	createdAt: { type: Date, default: Date.now },
});

export default model<IProduct>('Product', productSchema);
