import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import ProductList from "./product/ProductList";
import { RiBubbleChartFill } from "react-icons/ri";


export default function ProductSearchPage({ data }: { data: JSONObject[] }) {


    useEffect(() => {

    }, [data])


    // if( errMessage !== "" ) return ( <div className="m-4 text-red-600 text-lg">{errMessage}</div>);

    return (
        <>
            <nav className="flex items-center space-x-2 px-6 py-2 bg-mustard-yellow text-black text-lg">
               
                <div className="flex space-x-1 items-center">
                    <RiBubbleChartFill />
                    {data.length == 0 && <div>Sorry, no products match your search.</div>}
                    {data.length == 1 && <div>1 product found</div>}
                    {data.length > 1 && <div>{data.length} products found</div>}
                </div>
            </nav>

            <div className="bg-white p-3 m-3 h-fit min-h-full">
                <ProductList data={data} />
            </div>
        </>
    )
}