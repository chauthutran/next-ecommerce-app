'use server';

import { JSONObject } from "../definations";
import connectToDatabase from "./db";
import * as Utils from "@/lib/utils";
import mongoose from "mongoose";
import Cart from "../schemas/Cart.schema";



export async function fetchUserCart(userId: string): Promise<JSONObject> {
	
	try {
		await connectToDatabase();

		const userIdObj = new mongoose.Types.ObjectId(userId);
		const cart =  await Cart.find({user: userIdObj}).populate("product");
		// .populate("product", "name description price");

		return ({status: "success", data: Utils.cloneJSONObject(cart)});
	} catch (error: any) {
		return ({status: "error", message: error.message});
	}
}

export async function addProductToCart(userId: string, productId: string, quantity: number): Promise<JSONObject> {
	
	try {
		await connectToDatabase();

		const userIdObj = new mongoose.Types.ObjectId(userId);
		const productIdObj = new mongoose.Types.ObjectId(productId);

		let cart;

		const found = await Cart.find({user: userIdObj, product: productIdObj});
		if( found.length > 0 ) {
			const payload = found[0];
			payload.quantity = payload.quantity + 1;
			cart =  await Cart.findByIdAndUpdate(payload._id, payload, { new: true, runValidators: true });
		}
		else { // Add new
			const payload = {
				user : userIdObj,
				product : productIdObj,
				quantity : quantity
			}
	
			cart = await Cart.create(payload);
		}

      
		return ({status: "success", data: Utils.cloneJSONObject(cart)});

	} catch (error: any) {
		return ({status: "error", message: error.message});
	}
}