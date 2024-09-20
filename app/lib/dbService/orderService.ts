'use server';

import { JSONObject } from "../definations";
import connectToDatabase from "./db";
import * as Utils from "@/lib/utils";
import mongoose from "mongoose";
import Order from "../schemas/Order.schema";
import { removeProductsFromCart } from "./cartService";


export async function fetchUserOrders(userId: string): Promise<JSONObject> {
	
	try {
		await connectToDatabase();

		const userIdObj = new mongoose.Types.ObjectId(userId);
		const orders =  await Order.find({user: userIdObj}).populate({
            path: 'products.product', // Path to populate (nested inside `products`)
            select: 'name description price', // Specify the fields you want to include
          });

		return ({status: "success", data: Utils.cloneJSONObject(orders)});
	} catch (error: any) {
		return ({status: "error", message: error.message});
	}
}

export async function addProductToOrder(payload: JSONObject): Promise<JSONObject> {
	
	try {
		await connectToDatabase();

		const userIdObj = new mongoose.Types.ObjectId(payload.user);
		const productIdObjs = payload.products.map((cardItem: JSONObject) => { 
			return {
				product: new mongoose.Types.ObjectId(cardItem.product),
				quantity: cardItem.quantity
			}
		});

        const tempPayload = Utils.cloneJSONObject(payload);
        tempPayload.user = userIdObj;
        tempPayload.payload = productIdObjs;
	
        const order = await Order.create(payload);

		await removeProductsFromCart(payload.user, payload.products);

		return ({status: "success", data: Utils.cloneJSONObject(order)});

	} catch (error: any) {
		return ({status: "error", message: error.message});
	}
}