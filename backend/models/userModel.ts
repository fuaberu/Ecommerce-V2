import { Document, model, Schema } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export interface IUser extends Document {
	name: string;
	email: string;
	password: number;
	profilePic: {
		public_id: string;
		url: string;
	};
	role: string;
	passwordToken: string;
	createdAt: Date;
	isValidPassword: (arg0: string) => boolean;
	getJWTToken: () => string;
}

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please Enter The Your Name'],
		maxlength: [25, 'Name Can Not exceed 25 Caracters'],
		minlength: [4, 'Name Should Have More Than 4 Caracters'],
	},
	email: {
		type: String,
		required: [true, 'Please Enter The Your Email'],
		unique: [true, 'This Email is Already registered'],
		validate: [validator.isEmail, 'Please Enter a Valid Email'],
	},
	password: {
		type: String,
		required: [true, 'Please Enter The Your Password'],
		minlength: [6, 'Password Should Have More Than 6 Caracters'],
		select: false,
	},
	profilePic: {
		public_id: { type: String, required: true },
		url: { type: String, required: true },
	},
	role: {
		type: String,
		default: 'user',
	},
	passwordToken: {
		type: String,
	},
	createdAt: { type: Date, default: Date.now },
});

//hash the password before sending to mongoDB
userSchema.pre('save', async function (next) {
	//Encrypt user password
	const hash = await bcryptjs.hash(this.password, 10);

	this.password = hash;
	next();
});

//method to validate the password on login
userSchema.methods.isValidPassword = async function (password: string) {
	const compare = await bcryptjs.compare(password, this.password);

	return compare;
};

//JWT Token
userSchema.methods.getJWTToken = function () {
	const user = this;

	if (process.env.JWT_SECRET)
		return sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN || '6h',
		});
};

export default model<IUser>('User', userSchema);
