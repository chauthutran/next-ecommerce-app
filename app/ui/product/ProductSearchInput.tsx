'use client';

import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";


export default function ProductSearchInput({handleSearchResponse}: {handleSearchResponse: (response: JSONObject) => void}) {

    const searchInputRef = useRef<HTMLInputElement>(null);

    const fetchSimilarProducts = async () => {
        if (searchInputRef.current) {
            const query = searchInputRef.current.value;
            const response: JSONObject = await dbService.searchProducts(query);
            handleSearchResponse(response);
        }
    }

    return (
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden hover:border-gray-400">
            <input
                type="text"
                name="search"
                placeholder="Search ..."
                ref={searchInputRef}
                className="flex-1 py-2 px-4 text-sm outline-none placeholder:text-gray-500"
            />
            <button
                className=" text-gray-500 bg-white px-4 py-2 flex items-center justify-center "
                onClick={() => fetchSimilarProducts()}
            >
                <FaSearch className="h-5 w-5 hover:text-black" />
            </button>
        </div>
    )
}