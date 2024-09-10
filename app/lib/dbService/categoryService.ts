"use server";

import { JSONObject } from '@/lib/definations';
import connectToDatabase from "./db";
import Category from "../schemas/Category.schema";
import * as Utils from "@/lib/utils";

export async function fetchCategories(): Promise<JSONObject> {
	try {
		await connectToDatabase();

		const categories = await Category.find({});

		console.log("------ fetchCategories", categories);
		return { status: "success", data: Utils.cloneJSONObject(categories) };

		// return { status: "success", data: [] };
	} catch (error: any) {
		return { status: "error", message: error.message };
	}
}
