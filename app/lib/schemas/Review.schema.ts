"use server";

import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		product: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		comment: { type: String, required: true },
		rating: { type: Number, required: true },
		createdAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);
const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
