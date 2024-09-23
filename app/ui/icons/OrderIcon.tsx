import { useCurrentPage } from "@/contexts/MainUiContext";
import { PiPackageBold } from "react-icons/pi";
import * as Constant from "@/lib/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";


export default function OrderIcon() {
    
    const { setCurrentPage } = useCurrentPage();

    return (
        <>
         <div className="relative inline-block" onClick={() => setCurrentPage(Constant.PAGE_USER_ORDER)}>
            {/* Icon */}
            <PiPackageBold className="text-gray-500 hover:text-gray-600 text-xl" />

            {/* Badge */}
            {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                3
            </span> */}
        </div>
        </>
    )
}