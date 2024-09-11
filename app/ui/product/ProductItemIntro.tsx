import { JSONObject } from "@/lib/definations";
import Image from "next/image";
import ProductRating from "./ProductRating";
import { useMainUi } from "@/contexts/MainUiContext";
import * as AppStore from "@/lib/appStore";
import * as Constant from "@/lib/constants";


export default function ProductItemIntro({ data }: { data: JSONObject }) {

    const {setMainPage} = useMainUi();

    const showDetailsPage = () => {
        AppStore.setProduct(data);
        setMainPage( Constant.PAGE_PRODUCT_DETAILS );
        
    }

    return (
        <div key={data._id} className="bg-white p-4 rounded-lg shadow-md" onClick={() => showDetailsPage() }>
            <Image
                src={data.images[0]}
                alt={data.name}
                width={300}
                height={300}
                className="object-cover w-full h-48 mb-4 rounded"
            />

            <h2 className="text-gray-800">{data.description}</h2>
            <p className="text-lg font-semibold text-red-600 mt-2">${data.price}</p>
            <ProductRating rating={data.rating} numReviews={data.numReviews} />
        </div>
    )
}