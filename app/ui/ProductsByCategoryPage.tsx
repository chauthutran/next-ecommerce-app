'use client';

import { useEffect, useState } from "react";
import CategorySlide from "./layout/CategorySlide";
import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import ProductList from "./product/ProductList";
import { RiBubbleChartFill } from "react-icons/ri";
import { useCurrentPage } from "@/contexts/MainUiContext";


export default function ProductsByCategoryPage() {

    const { currentPage } = useCurrentPage();
    const [products, setProducts] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");

    const fetchProductsByCategory = async () => {
        const response: JSONObject = await dbService.fetchTopRatingProductsByCategory(currentPage.data!._id);
        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setProducts(response.data);
        }
    }

    useEffect(() => {
        fetchProductsByCategory();
    }, [currentPage]);


    if (errMessage !== "") return (<div>{errMessage}</div>);

    return (
        <div className="">
            {/* Make CategorySlide fixed */}
            {/* <div className="fixed w-[250px]">
                <CategorySlide />
            </div> */}

            {/* Adjust the margin-left for the main content so it doesn't overlap */}
            <div className=" bg-white rounded-lg p-3 m-3">
                <div className="font-semibold text-2xl mt-5 mb-10 border-b border-slate-400 pb-3 flex">
                    <RiBubbleChartFill className="text-firebrick mr-2" />
                    {currentPage.data!.name}
                </div>
                <ProductList data={products} />
            </div>
        </div>
    )
}