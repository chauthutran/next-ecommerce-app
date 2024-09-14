"use server";

import mongoose, { Schema } from "mongoose";


const ProductSchema = new Schema(
	{
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
        brand: { type: String },
        stock: { type: Number, default: 0 },
        images: [{ type: String }],
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        reviews: [
          {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            comment: String,
            rating: Number,
          },
        ],
        createdAt: { type: Date, default: Date.now }
	},
	{
		timestamps: true,
	}
)
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Create a text index on the `name`, `description`, `brand` fields
Product.collection.createIndex({ name: 'text', description: 'text', brand: 'text' });

export default Product;