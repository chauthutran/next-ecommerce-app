'use client';

import { JSONObject } from "@/lib/definations";
import ProductSearch from "../product/ProductSearchInput";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { DiYii } from "react-icons/di";
import { useAuth } from "@/contexts/AuthContext";
import { FaRegUser } from "react-icons/fa";
import UserMenus from "./UserMenus";
import { RiBubbleChartFill, RiHeart3Line } from "react-icons/ri";
import Navigation from "./Navigation";
import { MdLogout, MdOutlineShoppingCart } from "react-icons/md";
import { TfiPackage } from "react-icons/tfi";
import { useState } from "react";
import Modal from "../basics/Modal";
import LoginForm from "../user/LoginForm";
import { PiPackageBold, PiShoppingCartBold } from "react-icons/pi";
import { BiSolidPackage } from "react-icons/bi";


export default function Header() {

    const { currentPage, setCurrentPage } = useCurrentPage();
    const { user, setUser } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(false);

    const logout = () => {
        const ok = confirm("Are you sure you want to log out ?");
        if (ok) {
            setUser(null);
            if( currentPage.name === Constant.PAGE_USER_CART || currentPage.name === Constant.PAGE_USER_ORDER ) {
                setCurrentPage(Constant.PAGE_HOME);
            }
        }
    }

    return (
        <>
            <header className="bg-color-1 text-black border-b border-color-6 p-4 grid grid-cols-1 md:grid-cols-2 px-4 py-3  gap-4">

                <div className="text-2xl flex space-x-3 items-center">
                    <div className="cursor-pointer">
                        <DiYii className="size-10 text-color-2" onClick={() => setCurrentPage(Constant.PAGE_HOME)} />
                    </div>
                    <div className="font-extrabold cursor-pointer text-2xl whitespace-nowrap text-color-2" onClick={() => setCurrentPage(Constant.PAGE_HOME)} >E-Commerce</div>
                </div>

                <div className="flex flex-row space-x-3 justify-center items-center">
                    <div className="flex-1">
                        <ProductSearch
                            handleSearchResponse={(response: JSONObject) => setCurrentPage(Constant.PAGE_SEARCH_PRODUCT, response)} />
                    </div>

                    {user === null && <button className="p-2 bg-gold rounded-full border-2 border-white bg-gray-300 text-gray-400 hover:bg-gray-200" onClick={() => setShowLoginForm(true)} >
                        <FaRegUser /> 
                    </button>}

                    {user !== null && <>
                        <RiHeart3Line />

                        <PiShoppingCartBold />

                        <PiPackageBold size={18} />

                        <button
                            // className="p-2 bg-gold rounded-full border-2 border-white bg-color-17 text-color-1"
                            onClick={() => logout()} >
                            <FaRegUser />
                        </button>
                    </>}

                </div>

            </header>

            <Navigation />


            {showLoginForm && <Modal>
                <div className="">
                    <LoginForm onClose={() => setShowLoginForm(false)} />
                </div>
            </Modal>}
        </>
    )
}