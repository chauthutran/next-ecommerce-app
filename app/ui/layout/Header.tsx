'use client';

import { JSONObject } from "@/lib/definations";
import ProductSearch from "../product/ProductSearchInput";


export default function Header({onSearchSuccess, onSearchError}: {onSearchSuccess: (data: JSONObject[]) => void, onSearchError: (msg: string) => void}) {

    return (
        <header className="grid grid-cols-1 md:grid-cols-2 px-4 py-3 border-b-2 border-gray-200 gap-4">
            <div className="text-2xl flex space-x-3">
                <div className="">🛍️</div>
                <div className="font-extrabold text-black whitespace-nowrap">E-Commerce</div>
            </div>

            <ProductSearch 
                onSuccess={(data: JSONObject[]) => onSearchSuccess(data) }
                onError={(msg: string) => onSearchError(msg)}  />
        </header>
    )
}