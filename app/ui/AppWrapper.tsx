"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import HomePage from "./HomePage";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ProductDetailsPage from "./ProductDetailsPage";
import * as AppStore from "@/lib/appStore";
import ProductSearchPage from "./ProductSearchPage";
import { JSONObject } from "@/lib/definations";
import Header from "./layout/Header";
import { useState } from "react";
import ProductsByCategoryPage from "./ProductsByCategoryPage";


export default function AppWrapper() {

	const { currentPage, setCurrentPage } = useCurrentPage();
	const { user } = useAuth();
	const [searchResult, setSearchResult] = useState<JSONObject[]>([]);

	const showSearchResultPage = (searchResultList: JSONObject[]) => {
		setSearchResult(searchResultList);
		setCurrentPage(Constant.PAGE_SEARCH_PRODUCT);
	}

	
	return (
		<>
			<Header />
			
			<main className={`flex-1 overflow-auto bg-ghost-white`}>
				{currentPage.name === Constant.PAGE_HOME && <HomePage />}
				{currentPage.name === Constant.PAGE_PRODUCTS_BY_CATEGORY && <ProductsByCategoryPage />}
				{currentPage.name === Constant.PAGE_PRODUCT_DETAILS && <ProductDetailsPage data={AppStore.getProduct()} />}
				{currentPage.name === Constant.PAGE_SEARCH_PRODUCT && <ProductSearchPage />}


				{currentPage.name === Constant.PAGE_LOGIN && <LoginForm />}
				{currentPage.name === Constant.PAGE_USER_REGISTRATION && <RegisterForm />}
			</main>
		</>
	)
}