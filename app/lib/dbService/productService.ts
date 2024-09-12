"use server";

import { JSONObject } from '@/lib/definations';
import connectToDatabase from "./db";
import Product from "../schemas/Product.schema";
import * as Utils from "@/lib/utils";
import mongoose from 'mongoose';

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

export async function fetchTopRatingProductsByCategory(limit: number, categoryId: string): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const categoryIdObj = new mongoose.Types.ObjectId(categoryId);

		const products = await Product.find({category: categoryIdObj})
				.sort({ createdAt: 1 })  // Sort by rating in descending order
				.limit(limit);  // Limit to 10 products

		return { status: "success", data: Utils.cloneJSONObject(products) };

		// return { status: "success", data: [] };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function searchProducts(keyword: string): Promise<JSONObject> {
	try {
		await connectToDatabase();

		// Ensure the keywords are sanitized or processed as needed
		const searchQuery = keyword.trim();

		// Perform a text search
        const products = await Product.find({
			$or: [
			  { name: { $regex: searchQuery, $options: "i" } },
			  { description: { $regex: searchQuery, $options: "i" } },
			  { branch: { $regex: searchQuery, $options: "i" } }
			]
		  });

		return { status: "success", data: Utils.cloneJSONObject(products) };

		// return { status: "success", data: [] };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}