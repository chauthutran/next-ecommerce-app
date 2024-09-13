'use client';

import { JSONObject } from "@/lib/definations";
import ProductSearch from "../product/ProductSearchInput";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { SiReactquery } from "react-icons/si";
import { LuBaggageClaim } from "react-icons/lu";


export default function Header() {

    const { setCurrentPage } = useCurrentPage();

    return (
        <header className="grid grid-cols-1 md:grid-cols-2 px-4 py-3 border-b-2 border-gray-200 gap-4">
            
            <div className="text-2xl flex space-x-3 cursor-pointer items-center" onClick={() => setCurrentPage(Constant.PAGE_HOME)}>
                <div className="rounded-full pt-1 bg-yellow-100 text-"><LuBaggageClaim className="size-10" /></div>
                <div className="font-extrabold text-black whitespace-nowrap">E-Commerce</div>
            </div>

            <div className="flex mr-3 space-x-10 justify-center items-center">
                <div className="flex-1">
                    <ProductSearch 
                        handleSearchResponse={(response: JSONObject) => setCurrentPage(Constant.PAGE_SEARCH_PRODUCT, response) } />
                </div>
                <button className="px-5 py-2 rounded-md bg-mustard-yellow" onClick={() => setCurrentPage(Constant.PAGE_LOGIN)} >Login</button>
            </div>

        </header>
    )
}