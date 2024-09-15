'use client';

import { JSONObject } from "@/lib/definations";
import Image from "next/image";
import ProductDetailsNav from "./layout/ProductDetailsNav";
import ProductRating from "./product/ProductRating";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProductList from "./product/ProductList";
import { useCurrentPage } from "@/contexts/MainUiContext";


export default function ProductDetailsPage() {

    const productNo = 10;

    const { currentPage } = useCurrentPage();
    const [suggestedProducts, setSuggestedProducts] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");

    const fetchSimilarProducts = async () => {
        const response: JSONObject = await dbService.fetchTopRatingProductsByCategory( data.category._id, productNo );
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
            <ProductDetailsNav />

            <div className="flex flex-col">
                <div className="flex-1 grid grid-cols-1 gap-6 lg:grid-cols-2 md:grid-cols-2 h-full py-10 bg-white shadow-lg rounded-lg overflow-hidden m-3">
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

                    {/* Product Info */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
                        <ProductRating rating={data.rating} numReviews={data.numReviews} />
                        <p className="text-gray-600 mt-2">{data.description}</p>
                        <p className="text-lg font-semibold text-gray-800 mt-2">Price: ${data.price}</p>
                        <p className="text-sm text-gray-500 mt-1">Brand: {data.brand}</p>
                        <p className="text-sm text-gray-500">Stock: {data.stock}</p>

                    </div>

                    {/* Reviews Section */}
                    {data.reviews.length > 0 && (
                        <div className="p-4 border-t">
                            <h3 className="font-semibold text-gray-800">Reviews</h3>
                            {data.reviews.map((review: JSONObject, idx: number) => (
                                <div key={idx} className="mt-2">
                                    <p className="text-sm text-yellow-500">Rating: {review.rating}</p>
                                    <p className="text-sm text-gray-600">Comment: {review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <div className="font-semibold text-2xl mt-10 mb-5 border-b border-slate-400 pb-3 mx-4">Suggested products</div>
                    <div className="mx-4"><ProductList data={suggestedProducts} /></div>
                </div>
            </div>
        </>
    )
}