"use server";

import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
		address: {
			street: String,
			city: String,
			country: String,
			zipCode: String,
		},
		orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
		createdAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;