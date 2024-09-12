'use client';
import { useMainUi } from "@/contexts/MainUiContext";
import * as AppStore from "@/lib/appStore";
import * as Constant from "@/lib/constants";


export default function ProductDetailsNav() {
    const { setMainPage } = useMainUi();

    return (

        <nav className="flex items-center space-x-2 px-6 py-2 bg-mustard-yellow text-black text-lg">
            <div
                className="cursor-pointer px-4 py-1 hover:bg-white rounded-md transition duration-300 ease-in-out"
                onClick={() => setMainPage(Constant.PAGE_HOME)}
            >
                Home
            </div>
            
            <span>/</span>

            <div className="bg-white px-4 py-1 rounded-md shadow-sm">
                {AppStore.getProduct().name}
            </div>
        </nav>
    )
}