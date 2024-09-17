"use server";

import { JSONObject } from "@/lib/definations";
import connectToDatabase from "./db";
import ReviewSchema from "../schemas/Review.schema";
import * as Utils from "@/lib/utils";
import mongoose from "mongoose";
import User from "../schemas/User.schema";

export async function fetchReviewsByProduct(
	productId: string
): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const productIdObj = new mongoose.Types.ObjectId(productId);

		const reviews = await ReviewSchema.find({ product: productIdObj })
			.populate("user", "name")
			.sort({ createdAt: -1 }); // Sort by createdAt in descending order

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
            await dbService.generateReviews(product._id, "66e95a57d0e9712ad704c2d3", product.numReviews);
        }
       
    }
 */
export async function generateReviews(
	productId: string,
	no: number
): Promise<JSONObject> {
	const userIds = await User.find({});
	const userIdList = userIds.map((user) => user._id);

	try {
		await connectToDatabase();
		const productIdObj = new mongoose.Types.ObjectId(productId);
		let list = [];

		for (let i = 0; i < no; i++) {
			const userId = userIdList[Math.floor(Math.random() * 200)];
			const userIdObj = new mongoose.Types.ObjectId(userId);
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
			list.push(item);
		}
		
console.log("--- product: " + productId + " ------ numReviews: " + no);
		await ReviewSchema.insertMany(list);
	} catch (ex: any) {
		console.log(ex.message);
	}
	return { status: "success" };
}
