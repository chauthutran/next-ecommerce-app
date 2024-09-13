"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Contanst from "@/lib/constants";
import { JSONObject } from '@/lib/definations';

interface MainUiContextProps {
	currentPage: JSONObject;
	setCurrentPage: (name: string, data?: JSONObject | null) => void;
}

const MainUiContext = createContext<MainUiContextProps>({
	currentPage: {name: Contanst.PAGE_HOME, data: null},
	setCurrentPage: (name: string, data?: JSONObject | null) => {}
});

export const useCurrentPage = (): MainUiContextProps => {
	const context = useContext(MainUiContext);
	if (!context) {
	  throw new Error('useCurrentPage must be used within an MainUiProvider');
	}
	return context;
};

export const MainUiProvider = ({ children }: { children: ReactNode }) => {
	const [currentPageData, setCurrentPageData] = useState<{ name: string; data?: JSONObject | null }>({
		name: Contanst.PAGE_HOME,  // Default value for page name
		data: null,    // Default value for page data
	});

	// Modify your setCurrentPage usage to pass the entire object
	const goToPage = (name: string, data: JSONObject | null = null) => {
		setCurrentPageData({ name, data });
	};

	return (
		<MainUiContext.Provider value={{ currentPage: currentPageData, setCurrentPage: goToPage }}>
			{children}
		</MainUiContext.Provider>
	);
};
