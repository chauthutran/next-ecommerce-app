'use client';

import { JSONObject } from "@/lib/definations";
import Image from "next/image";
import ProductRating from "./product/ProductRating";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProductList from "./product/ProductList";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { RiBubbleChartFill } from "react-icons/ri";
import * as AppStore from "@/lib/appStore";
import DOMPurify from "dompurify";
import Modal from "./basics/Modal";
import ReviewList from "./review/ReviewList";

  
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
    
    const renderConfigData = () => {
        const template = AppStore.getConfigData().productDetails.join("");
        const sanitizedHTML = template.replace(/\$\{data\.(\w+)\}/g, (match: string, key: string) => {
            return key in data ? data[key] : match;
        });

        return DOMPurify.sanitize(sanitizedHTML);
    }


    const detailsInfoTag = renderConfigData();

    return (
        <>
            {(previousPage?.name === Constant.PAGE_HOME 
                || previousPage?.name === Constant.PAGE_SEARCH_PRODUCT
                || previousPage?.name === Constant.PAGE_PRODUCTS_BY_CATEGORY
            ) && <nav className="flex items-center px-6 py-1 bg-mustard-yellow text-black">
                <RiBubbleChartFill className="" />
                
                {/* Home Navigation */}
                {previousPage?.name === Constant.PAGE_HOME && (
                    <div className="flex items-center space-x-1">
                        <div
                            className="px-2 py-1 hover:bg-ghost-white rounded-sm cursor-pointer"
                            onClick={() => setCurrentPage(Constant.PAGE_HOME)}
                        >
                            Home
                        </div>
                    </div>
                )}
                
                {/* Category Navigation */}
                {previousPage?.name === Constant.PAGE_PRODUCTS_BY_CATEGORY && (
                    <div className="flex items-center space-x-1">
                        <div
                            className="px-2 py-1 hover:bg-ghost-white rounded-sm cursor-pointer"
                            onClick={() => setCurrentPage(Constant.PAGE_PRODUCTS_BY_CATEGORY, previousPage.data)}
                        >
                            {previousPage.data.name}
                        </div>
                    </div>
                )}

                {/* Search Results Navigation */}
                {previousPage?.name === Constant.PAGE_SEARCH_PRODUCT && (
                    <div className="flex items-center space-x-2">
                        {/* Search Result Button */}
                        <div
                            className="px-4 py-1 hover:bg-ghost-white rounded-md cursor-pointer"
                            onClick={() => setCurrentPage(Constant.PAGE_SEARCH_PRODUCT, previousPage.data)}
                        >
                            Search Results
                        </div>

                        {/* Separator */}
                        <span>/</span>

                        {/* Current Product Name */}
                        <div className="bg-white px-4 py-1 rounded-md shadow-sm">
                            {currentPage.data.name}
                        </div>
                    </div>
                )}
            </nav>}


            <div className="flex flex-col mx-4">
                <div className="flex-1 grid grid-cols-1 gap-6 lg:grid-cols-2 md:grid-cols-2 h-full bg-white shadow-lg rounded-t-lg overflow-hidden mt-3">
                    {/* Image Section */}
                    {data.images.length > 0 && (
                        <div className="flex lg:justify-end lg:items-end">
                            {data.images.map((img: string, idx: number) => (
                                <Image
                                    key={idx}
                                    src={img}
                                    alt={data.name}
                                    width={300}
                                    height={300}
                                    className="object-cover w-72 h-72 rounded-lg"
                                />
                            ))}
                        </div>
                    )}

                    {/* Product Info - If there is configuration for 'productDetails' */}
                    {detailsInfoTag != null && <div>
                        <div 
                            className="pt-4 px-4"
                            dangerouslySetInnerHTML={{ __html: detailsInfoTag }}
                            
                        />
                        <div className="mx-4 mt-2"><ProductRating rating={data.rating} numReviews={data.numReviews} /></div>
                    </div>}

                    {/* Product Info - Default infor without the configuration 'productDetails' */}
                    {detailsInfoTag === null && <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
                         <ProductRating rating={data.rating} numReviews={data.numReviews} />
                        <p className="text-gray-600 mt-2">{data.description}</p>
                        <p className="text-lg font-semibold text-red-600 mt-2">Price: ${data.price}</p>
                        <p className="text-sm text-gray-500 mt-1">Brand: {data.brand}</p>
                        <p className="text-sm text-gray-500">Stock: {data.stock}</p>
                    </div>}

                </div>

                {/* Reviews Section */}
                <div className="px-6 border-t w-full bg-white shadow-lg rounded-b-lg pb-5">
                    <div className="font-semibold text-xl mt-5 mb-3 border-b border-slate-400 pb-3 flex">
                        Reviews
                    </div>
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