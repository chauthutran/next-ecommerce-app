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
            <div className="flex flex-col mx-4 bg-white shadow-lg rounded-t-lg overflow-hidden mt-3 pt-5">
                   <ProductDetailsInfo data={data} />

                {/* Reviews Section */}
                <div className="px-6 border-t w-full bg-white shadow-lg rounded-b-lg pb-5">
                    <ReviewList productId={data._id} />
                </div>
                
                <div className="bg-white rounded-lg mt-5 border">
                    <div className="font-semibold text-2xl mt-5 mb-10 border-b border-slate-400 pb-3 flex">
                        <RiBubbleChartFill className="text-firebrick mr-2" />
                        Suggested products
                    </div>
                    <div className="mx-4"><ProductList data={suggestedProducts} /></div>
                </div>
            </div>

        </>
    )
}