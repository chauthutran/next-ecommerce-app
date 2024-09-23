"use client";

import { JSONObject } from '@/lib/definations';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as dbService from "@/lib/dbService";
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constants";

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

	processStatus: string;
	error: string | null;
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

	processStatus: "",
	error: null
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
	const [error, setError] = useState<string | null>(null);
	const [userCart, setUserCart] = useState<JSONObject[] | null>(null);
	const [processStatus, setProcessStatus] = useState<string>("");


	const login = async (email: string, password: string) => {
		setProcessStatus(Constant.RESPONSE_LOGIN_REQUEST);
		setError(null);

		const response: JSONObject = await dbService.login({email, password});

		if (response.status != "success")  {
			setProcessStatus(Constant.RESPONSE_LOGIN_FAILURE);
			setError(response.message);
		}
		else {
			setUser(response.data);
			setProcessStatus(Constant.RESPONSE_LOGIN_SUCCESS);
		}
	};

	const logout = () => {
		setUser(null);
	}

	const register = async(userData: JSONObject) => {
		setProcessStatus(Constant.RESPONSE_REGISTER_USER_REQUEST);
		setError(null);
		
		const response: JSONObject = await dbService.register(userData);
		if (response.status != "success")  {
			setError(response.message);
			setProcessStatus(Constant.RESPONSE_REGISTER_USER_FAILURE);
		}
		else {
			setUser(response.data);
			setProcessStatus(Constant.RESPONSE_REGISTER_USER_SUCCESS);
		}
	}

	
	const updateProfile = async( user: JSONObject) => {
		setProcessStatus(Constant.RESPONSE_UPDATE_PROFILE_REQUEST);
		setError(null);

		const response = await dbService.updateProfile(user);
		if (response.status != "success")  {
			setError(response.message);
			setProcessStatus(Constant.RESPONSE_UPDATE_PROFILE_FAILURE);
		}
		else {
			setUser(response.data);
			setProcessStatus(Constant.RESPONSE_UPDATE_PROFILE_FAILURE);
		}
	}

	const changePassword = async(curPassword: string, newPassword: string) => {
		setProcessStatus(Constant.RESPONSE_CHANGE_PASSWORD_REQUEST);
		setError(null);

		const checkCurrentPasswordResponse = await dbService.login({email: user!.email, password: curPassword});
        if( checkCurrentPasswordResponse.status === "success" ) {
            const response = await dbService.updatePassword(user!._id, newPassword);
            if( response.status === "error") {
                setError(response.messsage);
				setProcessStatus(Constant.RESPONSE_CHANGE_PASSWORD_FAILURE);
            }
            else {
               	setUser( response.data );
				setProcessStatus(Constant.RESPONSE_CHANGE_PASSWORD_SUCCESS);
            }
        }
        else {
            setError('Current password is wrong!');
        }
	}


	const fetchUserCart = async() => {
		setProcessStatus(Constant.RESPONSE_FETCH_USER_CART_REQUEST);
		setError(null);

		if( userCart === null ) {
			const response: JSONObject = await dbService.fetchUserCart(user!._id);

			if (response.status != "success") {
				setError(response.message);
				setProcessStatus(Constant.RESPONSE_FETCH_USER_CART_FAILURE);
			}
			else {
				setUserCart(response.data);
				setProcessStatus(Constant.RESPONSE_FETCH_USER_CART_SUCCESS);
			}
		}
	}

	const addProductToCart = async( data: JSONObject )=> {
		setProcessStatus(Constant.RESPONSE_ADD_PRODUCT_TO_CART_REQUEST);
		setError(null);

		const response = await dbService.addProductToCart(user!._id, data._id);
		if (response.status != "success")  {
			setError(response.message);
			setProcessStatus(Constant.RESPONSE_ADD_PRODUCT_TO_CART_FAILURE);
		}
		else {
			const newProductInCart = response.data;
			const newUserCart = Utils.cloneJSONObject(userCart!);
			Utils.findAndReplaceItemFromList(newUserCart, newProductInCart._id, "_id", newProductInCart );

			setUserCart(newUserCart);
			setProcessStatus(Constant.RESPONSE_ADD_PRODUCT_TO_CART_FAILURE);
		}
	}


	return (
		<AuthContext.Provider value={{  processStatus, user, setUser, error: error, login, logout, register, userCart, fetchUserCart, addProductToCart, updateProfile, changePassword }}>
			{children}
		</AuthContext.Provider>
	);
};
