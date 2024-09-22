import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { RiArrowGoBackLine } from "react-icons/ri";
import { BiSolidHome } from "react-icons/bi";
import { useAuth } from "@/contexts/AuthContext";
import CategoryMenus from "./CategoryMenus";


export default function Navigation() {

    const { previousPage, currentPage, setCurrentPage } = useCurrentPage();
    const { user } = useAuth();


    const goBackPage = (): string | null => {
        if (previousPage?.name === Constant.PAGE_HOME
            || currentPage?.name === Constant.PAGE_PRODUCTS_BY_CATEGORY
            || currentPage?.name === Constant.PAGE_USER_CART
            || currentPage?.name === Constant.PAGE_SEARCH_PRODUCT) return Constant.PAGE_HOME;

        if (currentPage?.name === Constant.PAGE_PRODUCT_DETAILS) {
            if (previousPage?.name === Constant.PAGE_SEARCH_PRODUCT) return Constant.PAGE_SEARCH_PRODUCT;

            if (previousPage?.name === Constant.PAGE_PRODUCTS_BY_CATEGORY) return Constant.PAGE_PRODUCTS_BY_CATEGORY;
        }

        return null;
    }

    const prevPage = goBackPage();
    return (
        <nav className="bg-color-2 text-white px-8 py-2 flex">
            <button className="mx-3 px-3 hover:bg-color-17 cursor-pointer" onClick={() => setCurrentPage(Constant.PAGE_HOME)}>Home</button>
            {/* <button className="mx-3 px-3 hover:bg-color-17 cursor-pointer">Category</button> */}
            <CategoryMenus />
            {user !== null && <>
                <button className="mx-3 px-3 hover:bg-color-17 cursor-pointer" onClick={() => setCurrentPage(Constant.PAGE_USER_CART)} >
                    Cart
                </button>
                <button className="mx-3 px-3 hover:bg-color-17 cursor-pointer" onClick={() => setCurrentPage(Constant.PAGE_USER_ORDER) } >
                    Orders
                </button>
                <button className="mx-3 px-3 hover:bg-color-17 cursor-pointer" onClick={() => setCurrentPage(Constant.PAGE_USER_PROFILE) } >
                    Profile
                </button>
            </>}
        </nav>
    )
}