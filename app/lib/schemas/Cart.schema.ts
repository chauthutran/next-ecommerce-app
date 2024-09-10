"use server";

import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema(
	{
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        products: [
          {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
          },
        ],
        totalPrice: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
