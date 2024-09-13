import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import ProductList from "./product/ProductList";
import { RiBubbleChartFill } from "react-icons/ri";
import { useCurrentPage } from "@/contexts/MainUiContext";


export default function ProductSearchPage() {

    const { currentPage } = useCurrentPage();
console.log("currentPage: ", currentPage);
    if( currentPage.data!.status === "error" ) return ( <div className="m-4 text-red-600 text-lg">{currentPage.data!.message}</div>);

    const resultList = currentPage.data.data;

    return (
        <>
            <nav className="flex items-center space-x-2 px-6 py-2 bg-mustard-yellow text-black text-lg">
               
                <div className="flex space-x-1 items-center">
                    <RiBubbleChartFill />
                    {resultList.length == 0 && <div>Sorry, no products match your search.</div>}
                    {resultList.length == 1 && <div>1 product found</div>}
                    {resultList.length > 1 && <div>{resultList.length} products found</div>}
                </div>
            </nav>

            <div className="bg-white p-3 m-3 h-fit min-h-full">
                <ProductList data={resultList} />
            </div>
        </>
    )
}