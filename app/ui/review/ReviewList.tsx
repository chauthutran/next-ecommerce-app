import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import { IoIosCloseCircle } from "react-icons/io";
import ProductRating from "../product/ProductRating";


export default function ReviewList({ productId, onClose }: { productId: string, onClose: () => void }) {

    const [reviews, setReviews] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");

    const fetchReviews = async () => {
        const response: JSONObject = await dbService.fetchReviewsByProduct(productId);
        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setReviews(response.data);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, []);


    if (errMessage !== "") return (<div>{errMessage}</div>);

    return (
    
        <div className="bg-ghost-white rounded-lg min-w-[600px] md:w-3/4 ">
		
            <h2 className="text-2xl font-bold flex mx-3 p-3">
                <div className="flex-1">Customer Reviews</div>
                <div className="flex cursor-pointer" onClick={() => onClose()}>
                    <IoIosCloseCircle className="size-6" />
                </div>
            </h2>

			<div className="flex flex-col justify-center bg-white overflow-y-auto px-4 pt-2" >
                <div className="space-y-2" style={{ height: 'calc(100vh - 180px)' }}>
                    {reviews.map((review, idx) => (
                        <div key={`review_${review._id}`} className="py-2 border-b border-gray-300 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div className="text-lg font-semibold">{review.user.name}</div>
                                <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                            </div>

                            <ProductRating rating={review.rating} />

                            <p className="mt-2 text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
    </div>
    )
}
