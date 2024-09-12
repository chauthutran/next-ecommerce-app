'use client';

import { JSONObject } from "@/lib/definations";
import ProductSearch from "../product/ProductSearchInput";
import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { FaShopify } from "react-icons/fa";
import { SiLeaflet } from "react-icons/si";


export default function Header({onSearchSuccess, onSearchError}: {onSearchSuccess: (data: JSONObject[]) => void, onSearchError: (msg: string) => void}) {

    const { setMainPage } = useMainUi();

    return (
        <header className="grid grid-cols-1 md:grid-cols-2 px-4 py-3 border-b-2 border-gray-200 gap-4">
            <div className="text-2xl flex space-x-3 cursor-pointer items-center" onClick={() => setMainPage(Constant.PAGE_HOME)}>
                {/* <div className="rounded-full bg-[#ADD8E6] text-[#00246B]"><FaShopify className="size-10" /></div> */}
                <div className="rounded-full pt-1 bg-[#e2e6ad] text-[#6b6800]"><FaShopify className="size-10" /></div>
                <div className="font-extrabold text-black whitespace-nowrap">E-Commerce</div>
            </div>

            <ProductSearch 
                onSuccess={(data: JSONObject[]) => onSearchSuccess(data) }
                onError={(msg: string) => onSearchError(msg)}  />
        </header>
    )
}