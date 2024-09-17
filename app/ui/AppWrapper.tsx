"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import HomePage from "./HomePage";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductSearchPage from "./ProductSearchPage";
import Header from "./layout/Header";
import ProductsByCategoryPage from "./ProductsByCategoryPage";
import * as AppStore from "@/lib/appStore";
import { useEffect, useState } from "react";
import { JSONObject } from "@/lib/definations";


export default function AppWrapper() {

	const { currentPage, setCurrentPage } = useCurrentPage();
	const [configData, setConfigData] = useState<JSONObject | null>(null);

	const { user } = useAuth();

	const fetchConfigData = async() => {
		const configData = await AppStore.fetchConfigData();
		setConfigData(configData);
	}

	useEffect(() => {
		fetchConfigData();
	}, [])


	if( configData === null ) return (<div>Loading ... </div>);

	if( configData.status === "error" ) return (<div>{configData.message}</div>);

	return (
		<>
			<Header />

			<main className={`flex-1 overflow-auto bg-ghost-white`}>
				{currentPage.name === Constant.PAGE_HOME && <HomePage />}
				{currentPage.name === Constant.PAGE_PRODUCTS_BY_CATEGORY && <ProductsByCategoryPage />}
				{currentPage.name === Constant.PAGE_PRODUCT_DETAILS && <ProductDetailsPage />}
				{currentPage.name === Constant.PAGE_SEARCH_PRODUCT && <ProductSearchPage />}
			</main>
		</>
	)
}