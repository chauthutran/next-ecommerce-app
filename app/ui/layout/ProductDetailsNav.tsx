'use client';
import { useMainUi } from "@/contexts/MainUiContext";
import * as AppStore from "@/lib/appStore";
import * as Constant from "@/lib/constants";
import { IoIosArrowForward } from "react-icons/io";


export default function ProductDetailsNav () {
    const { setMainPage } = useMainUi();

    return (
        <nav className="flex space-x-3 px-5 py-2 bg-navy-blue items-center text-ghost-white">
            <div className="cursor-pointer px-2 hover:rounded-md hover:bg-vivid-red hover:text-black" onClick={() => setMainPage(Constant.PAGE_HOME)}>Home</div>
            <IoIosArrowForward />
            <div className="bg-vivid-red px-2 rounded-md text-black"> {AppStore.getProduct().name}</div>
        </nav>
    )
}