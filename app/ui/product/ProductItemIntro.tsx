import { JSONObject } from "@/lib/definations";
import Image from "next/image";
import ProductRating from "./ProductRating";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { useState } from "react";
import Modal from "../basics/Modal";
import ReviewList from "../review/ReviewList";


export default function ProductItemIntro({ data }: { data: JSONObject }) {

    const { setCurrentPage } = useCurrentPage();
    const [showReviews, setShowReviews] = useState(false);

    const showDetailsPage = () => {
        setCurrentPage(Constant.PAGE_PRODUCT_DETAILS, data);
    }

    return (
        <>
            <div key={data._id} className="bg-white p-4 rounded-lg shadow-md">
                <Image
                    src={data.images[0]}
                    alt={data.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-48 mb-4 rounded cursor-pointer"
                    onClick={() => showDetailsPage()}
                />

                <h2 className="text-gray-800">{data.description}</h2>
                <p className="text-lg font-semibold text-red-600 mt-2">${data.price}</p>
                <div className="cursor-pointer" onClick={() => data.numReviews > 0 && setShowReviews(true)}>
                    <ProductRating rating={data.rating} numReviews={data.numReviews} />
                </div>
            </div>

            {showReviews && <Modal >
                <div className="">
                    <ReviewList productId={data._id} onClose={() => setShowReviews(false)} />
                </div>
            </Modal>}
        </>
    )
}