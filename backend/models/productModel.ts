import { model, Schema } from 'mongoose';

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
	images: [
		{
			public_id: { type: String, required: true },
			url: { type: String, required: true },
		},
	],
	category: { type: String, required: [true, 'Please Enter The Product Category'] },
	createdAt: { type: Date, default: Date.now },
});

export default model('product', productSchema);
