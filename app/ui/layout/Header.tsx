'use client';

import { JSONObject } from "@/lib/definations";
import ProductSearch from "../product/ProductSearchInput";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { DiYii } from "react-icons/di";
import { useAuth } from "@/contexts/AuthContext";
import { FaRegUser } from "react-icons/fa";
import UserMenus from "./UserMenus";
import { RiBubbleChartFill } from "react-icons/ri";
import Navigation from "./Navigation";


export default function Header() {

    const { setCurrentPage } = useCurrentPage();
    const { user } = useAuth();

    return (
        <header className="bg-yellow-500 text-white shadow-md p-4 grid grid-cols-1 md:grid-cols-2 px-4 py-3  gap-4">

            <div className="text-2xl flex space-x-3 items-center">
                <div className="cursor-pointer">
                    <DiYii className="size-10 text-white" onClick={() => setCurrentPage(Constant.PAGE_HOME)} />
                </div>
                <div className="font-extrabold cursor-pointer text-2xl whitespace-nowrap" onClick={() => setCurrentPage(Constant.PAGE_HOME)} >E-Commerce</div>
            </div>

            <div className="flex flex-row space-x-3 justify-center items-center">
                <Navigation />
                <div className="flex-1">
                    <ProductSearch
                        handleSearchResponse={(response: JSONObject) => setCurrentPage(Constant.PAGE_SEARCH_PRODUCT, response)} />

                </div>
                {user !== null && <UserMenus handleItemClick={() => { }} />}
            </div>

        </header>
    )
}