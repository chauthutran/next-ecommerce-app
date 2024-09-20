import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { RiArrowGoBackLine } from "react-icons/ri";
import { BiSolidHome } from "react-icons/bi";


export default function Navigation() {

    const { previousPage, currentPage, setCurrentPage } = useCurrentPage();

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
        <>


            {prevPage !== null && <nav className="flex items-center border-2 border-yellow-300 bg-yellow-100 text-gray-700 p-1 rounded hover:bg-yellow-200">
                {/* Home Navigation */}
                {prevPage === Constant.PAGE_HOME && (
                    <div
                        className="flex space-x-2 rounded-sm cursor-pointer items-center"
                        onClick={() => setCurrentPage(Constant.PAGE_HOME)}
                    >
                        <BiSolidHome size={23} />
                    </div>
                )}

                {/* Category Navigation */}
                {prevPage === Constant.PAGE_PRODUCTS_BY_CATEGORY && (
                    <div
                        className="cursor-pointer"
                        onClick={() => setCurrentPage(Constant.PAGE_PRODUCTS_BY_CATEGORY, previousPage?.data)}
                    >
                        {/* {previousPage.data.icon} */}
                        <RiArrowGoBackLine size={22} />
                    </div>
                )}

                {/* Search Result Button */}
                {prevPage === Constant.PAGE_SEARCH_PRODUCT && (
                    <div
                        className="flex font-bold items-center space-x-2 hover:bg-ghost-white rounded-md cursor-pointer"
                        onClick={() => setCurrentPage(Constant.PAGE_SEARCH_PRODUCT, previousPage?.data)}
                    >
                        <RiArrowGoBackLine size={22} />
                    </div>
                )}
            </nav>}
        </>
    )
}