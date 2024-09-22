'use client';

import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import { useCurrentPage } from "@/contexts/MainUiContext";
import { RiArrowGoBackLine } from "react-icons/ri";
import * as Constant from "@/lib/constants";
import { IoMdArrowBack, IoMdArrowRoundBack } from "react-icons/io";


export default function ProductSearchInput({ handleSearchResponse }: { handleSearchResponse: (response: JSONObject) => void }) {

    const { previousPage, currentPage, setCurrentPage } = useCurrentPage();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const fetchSimilarProducts = async () => {
        if (searchInputRef.current) {
            const query = searchInputRef.current.value;
            const response: JSONObject = await dbService.searchProducts(query);

            handleSearchResponse(response);
        }
    }

    return (
        <>
            <div className="flex items-center border border-gray-300 bg-white rounded-md overflow-hidden hover:border-gray-400">
                {previousPage !== null && previousPage.name === Constant.PAGE_SEARCH_PRODUCT && (
                    <div
                        className="cursor-pointer px-2 text-color-2"
                        onClick={() => setCurrentPage(Constant.PAGE_SEARCH_PRODUCT, previousPage?.data)}
                    >
                        <IoMdArrowRoundBack size={22} />
                    </div>
                )}
                <input
                    type="text"
                    name="search"
                    placeholder="Search ..."
                    ref={searchInputRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            fetchSimilarProducts();
                        }
                    }}
                    className="flex-1 py-2 px-4 text-sm outline-none placeholder:text-gray-500"
                />
                <button
                    className=" text-gray-500 bg-white px-4 py-2 flex items-center justify-center"
                    onClick={() => fetchSimilarProducts()}
                >
                    <FaSearch className="h-5 w-5 hover:text-black" />
                </button>
            </div>
        </>
    )
}