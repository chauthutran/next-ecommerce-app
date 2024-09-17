'use server';

import { JSONObject } from "../definations";
import connectToDatabase from "./db";
import User from "../schemas/User.schema";
import * as Encrypt from "./encryptPassword";
import * as Utils from "@/lib/utils";
import mongoose from "mongoose";


export async function login({email, password}: JSONObject): Promise<JSONObject> {

	try {
		await connectToDatabase();
		const searchResult = await User.find({ email });

		// Find the users with the password if there is password in parametters
		let matchedUser: JSONObject | null = null;
		for (let i = 0; i < searchResult.length; i++) {
			const user = searchResult[i];
			const matched = await Encrypt.comparePassword(password!, user.password);
			if (matched) {
				matchedUser = user;
				break;
			}
		}
		
		if ( matchedUser === null ) {
			return ({status: "fail", message: "Username/Password is wrong"});
		}

		// Utils.cloneJSONObject(matchedUser) ==> need to do it so that I can avoid the issue "Warning: Only plain objects can be passed to Client Components from Server Components" 
		return ({status: "success", data: Utils.cloneJSONObject( matchedUser )});
	} catch (error: any) {
		return ({status: "error", message: error.message});
	}
}

export async function register(userData: JSONObject): Promise<JSONObject> {
	
	try {
		await connectToDatabase();

		const password = userData.password;
		userData.password = await Encrypt.hashPassword(password);

		const newUser = await User.create(userData);
		console.log("newUser: ", newUser);
		return ({status: "succcess", data: Utils.cloneJSONObject(newUser)});

	} catch (error: any) {
		return ({status: "error", message: error.message});
		// if (error instanceof mongoose.Error.ValidationError) {
        //     return({status: "error",error: 'Validation Error:' + error.message});
        // } else if (error instanceof mongoose.Error.CastError) {
        //     return({error: 'Cast Error:' + error.message});
        // } else if (error.code === 11000) {  // Duplicate key error code
        //     return({error: 'Duplicate Key Error:' + error.message});
        // } else {
        //     return({error: 'UnknownError:' + error.message});
        // }
	}
}

export async function generateUsers(): Promise<JSONObject> {
	try {
    await connectToDatabase();

    for (let i = 2; i <= 200; i++) {
		const item = 
		{
			"name": `TEST ${i}`,
			"email": `test${i}@example.com`,
			"password": "$2a$10$SLIKs23i5Ha/1hQTc3BJk.ulkbBrEtJKCdPDFnS4C81/jie.QzkZ6",
			"role": "customer",
			"address": {
			  "street": "123 ANC Street",
			  "city": "City A",
			  "country": "KR",
			  "zipCode": `${(i + "").padStart(2, '0')}`,
			},
			"orders": [],
			createdAt: new Date(
				2024,
				8,
				Math.floor(Math.random() * 30) + 1
			).toISOString(), // Random date in September 2024
		  };

		await User.create(item);
	}
}catch(ex: any) {
    console.log(ex.message);
}
	return { status: "success" };
}