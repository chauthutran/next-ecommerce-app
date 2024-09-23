"use client";

import { JSONObject } from '@/lib/definations';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as dbService from "@/lib/dbService";
import * as Utils from "@/lib/utils";

interface AuthContextProps {
	user: JSONObject | null;
	userCart: JSONObject[] | null;

	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (user: JSONObject) => Promise<void>;
	updateProfile: ( user: JSONObject) => Promise<void>;
	changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
	setUser: (user: JSONObject | null) => void;

	fetchUserCart: () => void;
	addProductToCart: (data: JSONObject) => void;

	error: string | null;
	loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	userCart: null,

	login: async () => { },
	logout: () => { },
	register: async(user: JSONObject) => {},
	updateProfile: async( user: JSONObject) => {},
	changePassword: async(oldPassword: string, newPassword: string) => {},
	setUser: (user: JSONObject | null) => {},

	fetchUserCart: async() => {},
	addProductToCart: async(data: JSONObject) => {},

	error: null,
	loading: false
});

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);

	if (!context) {
	  throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [userCart, setUserCart] = useState<JSONObject[] | null>(null);



	const login = async (email: string, password: string) => {
		setLoading(true);
		setError(null);

		const response: JSONObject = await dbService.login({email, password});

		if (response.status != "success")  {
			setError(response.message);
		}
		else {
			setUser(response.data);
		}

		setLoading(false);
	};

	const logout = () => {
		setUser(null);
	}

	const register = async(userData: JSONObject) => {
		setLoading(true);
		setError(null);
		
		const response: JSONObject = await dbService.register(userData);
		if (response.status != "success")  {
			setError(response.message);
		}
		else {
			setUser(response.data);
		}
	}

	
	const updateProfile = async( user: JSONObject) => {
		setLoading(true);
		setError(null);

		const response = await dbService.updateProfile(user);
		if (response.status != "success")  {
			setError(response.message);
		}
		else {
			setUser(response.data);
		}
	}

	const changePassword = async(curPassword: string, newPassword: string) => {
		setLoading(true);
		setError(null);

		const checkCurrentPasswordResponse = await dbService.login({email: user!.email, password: curPassword});
        if( checkCurrentPasswordResponse.status === "success" ) {
            const response = await dbService.updatePassword(user!._id, newPassword);
            if( response.status === "error") {
                setError(response.messsage);
            }
            else {
               	setUser( response.data );
            }
        }
        else {
            setError('Current password is wrong!');
        }
	}


	const fetchUserCart = async() => {
		setLoading(true);
		setError(null);

		if( userCart === null ) {
			const response: JSONObject = await dbService.fetchUserCart(user!._id);

			if (response.status != "success") {
				setError(response.message);
			}
			else {
				setUserCart(response.data);
			}
		}
	}

	const addProductToCart = async( data: JSONObject )=> {
		setLoading(true);
		setError(null);

		const response = await dbService.addProductToCart(user!._id, data._id);
		if (response.status != "success")  {
			setError(response.message);
		}
		else {
			const newProductInCart = response.data;
			const newUserCart = Utils.cloneJSONObject(userCart!);
			Utils.findAndReplaceItemFromList(newUserCart, newProductInCart._id, "_id", newProductInCart );

			setUserCart(newUserCart);
		}
	}


	return (
		<AuthContext.Provider value={{ user, setUser, loading, error: error, login, logout, register, userCart, fetchUserCart, addProductToCart, updateProfile, changePassword }}>
			{children}
		</AuthContext.Provider>
	);
};
