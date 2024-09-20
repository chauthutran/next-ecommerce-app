'use client';

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProductList from "./product/ProductList";
import { useCurrentPage } from "@/contexts/MainUiContext";
import { RiBubbleChartFill } from "react-icons/ri";
import ReviewList from "./product/ReviewList";
import ProductDetailsInfo from "./product/ProductDetailsInfo";

  
export default function ProductDetailsPage() {

    const productNo = 10;

    const { currentPage, setCurrentPage, previousPage } = useCurrentPage();
    const [suggestedProducts, setSuggestedProducts] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");


    const fetchSimilarProducts = async () => {
        const response: JSONObject = await dbService.fetchTopRatingProductsByCategory(data.category._id, productNo);
        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setSuggestedProducts(response.data);
        }
    }


    useEffect(() => {
        fetchSimilarProducts();
    }, []);

    const data = currentPage.data;
    
    return (
        <>
            <div className="flex flex-col mx-4 overflow-hidden my-2 pt-2">
                <div className="bg-white py-3">
                    <ProductDetailsInfo data={data} />
                </div>

                <section className="bg-white p-6 shadow-lg rounded-b-lg ">
                    <div className="text-yellow-500 text-xl font-bold mb-3 flex border-b border-gray-300 py-2">
                        <RiBubbleChartFill className="mr-2" />
                        <div>Reviews</div>
                    </div>
                    <div className="overflow-hidden">
                        <ReviewList productId={data._id} />
                    </div>
                </section>
                
                <div className="bg-white rounded-b-lg mt-5 border px-6 pt-2 pb-5 mb-3">
                    <div className="font-semibold text-2xl mt-5 mb-10 border-b border-slate-400 pb-3 flex">
                        <RiBubbleChartFill className="text-firebrick mr-2 " />
                        Suggested products
                    </div>
                    <div className="mx-4"><ProductList data={suggestedProducts} /></div>
                </div>
            </div>

        </>
    )
}