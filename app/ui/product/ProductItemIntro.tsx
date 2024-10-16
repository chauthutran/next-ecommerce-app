import { JSONObject } from "@/lib/definations";
import Image from "next/image";
import ProductRating from "./ProductRating";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { useState } from "react";
import Modal from "../basics/Modal";
import ReviewList from "./ReviewList";


export default function ProductItemIntro({ data }: { data: JSONObject }) {

    const { setCurrentPage } = useCurrentPage();

    const showDetailsPage = () => {
        setCurrentPage(Constant.PAGE_PRODUCT_DETAILS, data);
    }

    return (
        <div key={data._id} className="bg-white rounded-lg shadow-md cursor-pointer"
                onClick={() => showDetailsPage()} >
            <Image
                src={data.images[0]}
                alt={data.name}
                width={300}
                height={150}
                className="object-cover w-full h-36 mb-4 rounded"
            />

            <h2 className="text-gray-800 p-1">{data.description}</h2>
            <p className="text-lg font-semibold text-red-600 mt-2 p-1">${data.price}</p>
            
            <div className="p-1"><ProductRating rating={data.rating} numReviews={data.numReviews} /></div>
        </div>
    )
}