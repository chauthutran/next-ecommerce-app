'use client';

import { useMainUi } from "@/contexts/MainUiContext";
import { FaSearch } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import * as AppStore from "@/lib/appStore";
import * as Constant from "@/lib/constants";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useRef } from "react";


export default function Header() {

    const { setMainPage } = useMainUi();
    const searchInputRef = useRef<HTMLInputElement>(null);


    const showProductSearchPage = () => {
        if (searchInputRef.current) {
            const query = searchInputRef.current.value;
            AppStore.setSearchKey(query);
            setMainPage(Constant.PAGE_SEARCH_PRODUCT);
        }
    }

    return (
        <header className="grid grid-cols-3 px-4 py-3 border-b-2 border-gray-200">
            <div className="text-2xl flex space-x-3">
                <div className="">🛍️</div>
                <div className="font-extrabold text-black">E-Commerce</div>
            </div>
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden hover:border-gray-400">
                <input
                    type="text"
                    name="search"
                    placeholder="Search ..."
                    ref={searchInputRef}
                    className="flex-1 py-2 px-4 text-sm outline-none placeholder:text-gray-500"
                />
                <button
                    className=" text-gray-500 bg-white px-4 py-2 flex items-center justify-center "
                    onClick={() => showProductSearchPage()}
                >
                    <FaSearch className="h-5 w-5 hover:text-black" />
                </button>
            </div>

        </header>
    )
}