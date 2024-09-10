import { JSONObject } from "@/lib/definations";
import Image from "next/image";

export default function ProductItem({ data }: { data: JSONObject }) {

    return (
        <div className="flex flex-col justify-between h-full bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image Section */}
            {data.images.length > 0 && (
                // <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
                <div>
                    {data.images.map((img: string, idx: number) => (
                        <Image
                            key={idx}
                            src={img}
                            alt={data.name}
                            width={300}
                            height={300}
                            className="object-cover w-72 h-72"
                        />
                    ))}
                </div>
            )}

            {/* Product Info */}
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
                <p className="text-gray-600 mt-2">{data.description}</p>
                <p className="text-lg font-semibold text-gray-800 mt-2">Price: ${data.price}</p>
                <p className="text-sm text-gray-500 mt-1">Brand: {data.brand}</p>
                <p className="text-sm text-gray-500">Stock: {data.stock}</p>
                <p className="text-sm text-yellow-600 mt-1">Rating: {data.rating} ({data.numReviews} reviews)</p>
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

    )
}