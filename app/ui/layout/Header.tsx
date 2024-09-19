'use client';

import { JSONObject } from "@/lib/definations";
import ProductSearch from "../product/ProductSearchInput";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { DiYii } from "react-icons/di";
import { useAuth } from "@/contexts/AuthContext";
import { FaRegUser } from "react-icons/fa";
import UserMenus from "./UserMenus";


export default function Header() {

    const { setCurrentPage } = useCurrentPage();
	const { user } = useAuth();

    return (
        <header className="grid grid-cols-1 md:grid-cols-2 px-4 py-3 border-b-2 border-gray-200 gap-4">
           
            <div className="text-2xl flex space-x-3 items-center" onClick={() => setCurrentPage(Constant.PAGE_HOME)}>
                <div className="rounded-full pt-1 cursor-pointer bg-yellow-100"><DiYii className="size-10 text-yellow-500" /></div>
                <div className="font-extrabold cursor-pointer text-black whitespace-nowrap">E-Commerce</div>
            </div>

            <div className="flex mr-3 space-x-5 justify-center items-center flex-row">
                <div className="flex-1">
                    <ProductSearch 
                        handleSearchResponse={(response: JSONObject) => setCurrentPage(Constant.PAGE_SEARCH_PRODUCT, response) } />
                    
                </div>
                {/* {user === null && <div className="rounded-full border-2 border-yellow-300 bg-yellow-100 p-2">
                    <FaRegUser/> 
                </div>} */}

                {user !== null && <UserMenus handleItemClick={() => {}} />}
            </div>

        </header>
    )
}