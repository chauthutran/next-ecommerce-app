"use server";

import { JSONObject } from "@/lib/definations";
import connectToDatabase from "./db";
import ReviewSchema from "../schemas/Review.schema";
import * as Utils from "@/lib/utils";
import mongoose from "mongoose";

export async function fetchReviewsByProduct(
	productId: string
): Promise<JSONObject> {
	try {
		await connectToDatabase();
		const productIdObj = new mongoose.Types.ObjectId(productId);

		const reviews = await ReviewSchema.find({ product: productIdObj }).sort(
			{ createdAt: 1 }
		); // Sort by createdAt in descending order

		return { status: "success", data: Utils.cloneJSONObject(reviews) };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

/**
 * 
    const fetchReviews = async() => {
        const allProducts = await dbService.fetchLatestProducts(192);
        console.log(allProducts.data)
        for( var i=0; i<allProducts.data.length; i++ ) {
            const product = allProducts.data[i];
            await dbService.generateReviews(product._id, "66e95a57d0e9712ad704c2d3", product.rating);
        }
       
    }
 */
export async function generateReviews(productId: string, userId: string, no: number): Promise<JSONObject> {
	try {
    await connectToDatabase();
	const productIdObj = new mongoose.Types.ObjectId(productId);
	const userIdObj = new mongoose.Types.ObjectId(userId);

    for (let i = 0; i < no; i++) {
		const item = {
			product: productIdObj,
            user: userIdObj,
			comment: `Review ${i + 1}: This is a comment.`,
			rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
			createdAt: new Date(
				2024,
				8,
				Math.floor(Math.random() * 30) + 1
			).toISOString(), // Random date in September 2024
		};

		await ReviewSchema.create(item);
	}
}catch(ex: any) {
    console.log(ex.message);
}
	return { status: "success" };
}
