"use server";

import { JSONObject } from '@/lib/definations';
import connectToDatabase from "./db";
import Product from "../schemas/Product.schema";
import * as Utils from "@/lib/utils";

export async function fetchTopRatingProducts(limit: number): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const products = await Product.find({})
				.sort({ rating: 1 })  // Sort by rating in descending order
				.limit(limit);  // Limit to 10 products

		return { status: "success", data: Utils.cloneJSONObject(products) };

		// return { status: "success", data: [] };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function fetchLatestProducts(limit: number): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const products = await Product.find({})
				.sort({ createdAt: 1 })  // Sort by rating in descending order
				.limit(limit);  // Limit to 10 products

		return { status: "success", data: Utils.cloneJSONObject(products) };

		// return { status: "success", data: [] };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}
