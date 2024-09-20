"use server";

import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
			},
		],
		shippingAddress: {
			street: { type: String, required: true },
			city: { type: String, required: true },
			country: { type: String, required: true },
			zipCode: { type: String, required: true },
		},
		status: {
			type: String,
			enum: ["pending", "shipped", "delivered"],
			default: "pending",
		},
		createdAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
