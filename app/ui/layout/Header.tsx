'use client';

import { JSONObject } from "@/lib/definations";
import ProductSearch from "../product/ProductSearchInput";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { DiYii } from "react-icons/di";


export default function Header() {

    const { setCurrentPage } = useCurrentPage();

    return (
        <header className="grid grid-cols-1 md:grid-cols-2 px-4 py-3 border-b-2 border-gray-200 gap-4">
           
            <div className="text-2xl flex space-x-3 items-center">
                <div className="rounded-full pt-1 cursor-pointer bg-yellow-100" onClick={() => setCurrentPage(Constant.PAGE_HOME)}><DiYii className="size-10 text-yellow-500" /></div>
                <div className="font-extrabold cursor-pointer text-black whitespace-nowrap" onClick={() => setCurrentPage(Constant.PAGE_HOME)}>E-Commerce</div>
            </div>

            <div className="flex mr-3 space-x-10 justify-center items-center">
                <div className="flex-1">
                    <ProductSearch 
                        handleSearchResponse={(response: JSONObject) => setCurrentPage(Constant.PAGE_SEARCH_PRODUCT, response) } />
                </div>
            </div>

        </header>
    )
}