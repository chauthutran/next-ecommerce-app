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
				.populate('category', 'name') // Populate the category field and select the 'name' field
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
				.populate('category', 'name') // Populate the category field and select the 'name' field
				.sort({ createdAt: 1 })  // Sort by rating in descending order
				.limit(limit);  // Limit to 10 products

		return { status: "success", data: Utils.cloneJSONObject(products) };

		// return { status: "success", data: [] };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}

export async function fetchTopRatingProductsByCategory( categoryId: string, limit?: number): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const categoryIdObj = new mongoose.Types.ObjectId(categoryId);

		const productsQuery = Product.find({ category: categoryIdObj })
				.populate('category', 'name')  // Populate the category field and select the 'name' field
				.sort({ createdAt: 1 });  // Sort by createdAt in ascending order

		// Apply limit only if it's provided
		if (limit) {
			productsQuery.limit(limit);
		}

		const products = await productsQuery; // Await the query result


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
			  { brand: { $regex: searchQuery, $options: "i" } }
			]
		  }) .populate('category', 'name') // Populate the category field and select the 'name' field;

		return { status: "success", data: Utils.cloneJSONObject(products) };

		// return { status: "success", data: [] };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}


export async function getAllBrandes(): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const brands = await Product.distinct('brand');

		return { status: "success", data: Utils.cloneJSONObject(brands) };

		// return { status: "success", data: [] };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}