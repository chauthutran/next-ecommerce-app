"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import HomePage from "./HomePage";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ProductDetailsPage from "./ProductDetailsPage";
import * as AppStore from "@/lib/appStore";
import SearchProductsPage from "./ProductSearchPage";
import ProductSearchPage from "./ProductSearchPage";
import { JSONObject } from "@/lib/definations";
import Header from "./layout/Header";
import { useState } from "react";


export default function AppWrapper() {

	const { mainPage, setMainPage } = useMainUi();
	const { user } = useAuth();
	const [searchResult, setSearchResult] = useState<JSONObject[]>([]);

	const showSearchResultPage = (searchResultList: JSONObject[]) => {
		setSearchResult(searchResultList);
		setMainPage(Constant.PAGE_SEARCH_PRODUCT);
	}

	
	return (
		<>
			<Header onSearchSuccess={(data: JSONObject[]) => showSearchResultPage(data) }
				onSearchError={ (msg: string) => {} }/>
			
			<main className={`flex-1 overflow-auto bg-ghost-white`}>
				{mainPage === Constant.PAGE_HOME && <HomePage />}
				{mainPage === Constant.PAGE_PRODUCT_DETAILS && <ProductDetailsPage data={AppStore.getProduct()} />}
				{mainPage === Constant.PAGE_SEARCH_PRODUCT && <ProductSearchPage data={searchResult} />}

				{mainPage === Constant.PAGE_LOGIN && <LoginForm />}
				{mainPage === Constant.PAGE_USER_REGISTRATION && <RegisterForm />}
			</main>
		</>
	)
}