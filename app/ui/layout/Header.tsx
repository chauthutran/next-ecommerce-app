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
import { MdLogout, MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { TfiPackage } from "react-icons/tfi";
import { useState } from "react";
import Modal from "../basics/Modal";
import LoginForm from "../user/LoginForm";
import { PiPackageBold, PiShoppingCartBold } from "react-icons/pi";
import { BiCategoryAlt, BiSolidPackage } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import CategoryMenus from "./CategoryMenus";
import CartIcon from "../icons/CartIcon";
import FavoriteIcon from "../icons/FavoriteIcon";
import OrderIcon from "../icons/OrderIcon";


export default function Header() {

    const { currentPage, setCurrentPage } = useCurrentPage();
    const { user, setUser } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(false);


    return (
        <>
            <header className="bg-color-1 text-black border-b border-color-6 p-4 grid grid-cols-1 md:grid-cols-2 px-4 py-3  gap-4">

                <div className="text-2xl flex space-x-3 items-center">
                    <div className="cursor-pointer">
                        <DiYii className="size-10 text-color-2" onClick={() => setCurrentPage(Constant.PAGE_HOME)} />
                    </div>
                    <div className="font-extrabold cursor-pointer text-2xl whitespace-nowrap text-color-2" onClick={() => setCurrentPage(Constant.PAGE_HOME)} >
                        E-Commerce
                    </div>
                </div>

                <div className="flex flex-row justify-center items-center space-x-1">
                    <div className="text-color-2 hover:text-gray-600" >
                        <CategoryMenus />
                    </div>
                    <div className="flex-1 pr-2">
                        <ProductSearch
                            handleSearchResponse={(response: JSONObject) => setCurrentPage(Constant.PAGE_SEARCH_PRODUCT, response)} />
                    </div>

                    {user === null && <button
                        onClick={() => setShowLoginForm(true)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <FaRegUser /> 
                    </button>}


                    {user !== null && <div className="flex space-x-3">
                        <FavoriteIcon />

                        <CartIcon />

                        <OrderIcon />

                        <UserMenus />
                    </div>}

                </div>

            </header>

            {showLoginForm && <Modal>
                <div className="">
                    <LoginForm onClose={() => setShowLoginForm(false)} />
                </div>
            </Modal>}
        </>
    )
}