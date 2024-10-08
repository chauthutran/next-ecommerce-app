"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import HomePage from "./HomePage";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductSearchPage from "./ProductSearchPage";
import Header from "./layout/Header";
import ProductsByCategoryPage from "./ProductsByCategoryPage";
import * as AppStore from "@/lib/appStore";
import { useEffect, useState } from "react";
import { JSONObject } from "@/lib/definations";
import CartPage from "./user/cart/CartPage";
import Footer from "./layout/Footer";
import OrderPage from "./user/order/OrderPage";
import ProfilePage from "./user/ProfilePage";
import ChangePasswordForm from "./user/ChangePasswordForm";


export default function AppWrapper() {

	const { currentPage, setCurrentPage } = useCurrentPage();
	const [configData, setConfigData] = useState<JSONObject | null>(null);

	const { user } = useAuth();

	const fetchConfigData = async () => {
		const configData = await AppStore.fetchConfigData();
		console.log("configData", configData);
		setConfigData(configData);
	}

	useEffect(() => {
		fetchConfigData();
	}, [])


	if (configData === null) return (<div>Loading ... </div>);

	if (configData.status === "error") return (<div>{configData.message}</div>);

	return (
		<>
			<main className={`flex-1 overflow-auto bg-color-8`}>
				{currentPage.name === Constant.PAGE_HOME && <HomePage />}
				{currentPage.name === Constant.PAGE_PRODUCTS_BY_CATEGORY && <ProductsByCategoryPage />}
				{currentPage.name === Constant.PAGE_PRODUCT_DETAILS && <ProductDetailsPage />}
				{currentPage.name === Constant.PAGE_SEARCH_PRODUCT && <ProductSearchPage />}

				{currentPage.name === Constant.PAGE_USER_CART && <CartPage />}
				{currentPage.name === Constant.PAGE_USER_ORDER && <OrderPage />}
				{currentPage.name === Constant.PAGE_USER_PROFILE && <ProfilePage />}
				{currentPage.name === Constant.PAGE_USER_CHANGE_PASSWORD && <ChangePasswordForm />}

				{(currentPage.name !== Constant.PAGE_USER_PROFILE
					&& currentPage.name !== Constant.PAGE_USER_CHANGE_PASSWORD) && <Footer /> }
			</main>

			{(currentPage.name === Constant.PAGE_USER_PROFILE
					|| currentPage.name === Constant.PAGE_USER_CHANGE_PASSWORD) && <Footer /> }
			
		</>
	)
}