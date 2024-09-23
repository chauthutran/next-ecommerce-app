import { useCurrentPage } from "@/contexts/MainUiContext";
import { FaShoppingCart } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import * as Constant from "@/lib/constants";
import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";


export default function CartIcon() {

    const { fetchUserCart, userCart } = useAuth();
    const { setCurrentPage } = useCurrentPage();

    useEffect(() => {
        fetchUserCart();
    }, []);


    return (
        <>
         <div className="relative inline-block" onClick={() => setCurrentPage(Constant.PAGE_USER_CART)}>
            {/* Icon */}
            <PiShoppingCartBold className="text-gray-500 hover:text-gray-600 text-xl" />

            {/* Badge */}
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {userCart === null ? "0" : userCart.length}
            </span>
        </div>
        </>
    )
}