import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";


export default function ReviewList({ productId }: { productId: string }) {

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
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div className="text-lg font-semibold">{review.user}</div>
                                <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                            </div>

                            <div className="mt-2">
                                {/* Star Rating */}
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, starIdx) => (
                                        <svg
                                            key={starIdx}
                                            className={`h-5 w-5 ${starIdx < review.rating ? 'text-yellow-500' : 'text-gray-300'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.974 2.876a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.974-2.876a1 1 0 00-1.176 0l-3.974 2.876c-.784.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.487 9.1c-.784-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            <p className="mt-2 text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    )
}
