import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import Image from 'next/image';
import ProductItemIntro from "../product/ProductItemIntro";


export default function TopRatingProducts() {

    const productNo = 10;

    const [products, setProducts] = useState<JSONObject | null>(null);
    const [errMessage, setErrMessage] = useState("");

    const fetchCategories = async () => {
        const response: JSONObject = await dbService.fetchTopRatingProducts(productNo);
        if( response.status != "success" ) {
            setErrMessage( response.message );
        }
        else {
            setProducts( response.data );
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    
    if( errMessage !== "" ) return ( <div>{errMessage}</div>);
    else if( products == null ) return ( <div>Loading ...</div>);

    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map((product: JSONObject, idx: number) => (
                <ProductItemIntro key={`product_${product._id}`} data={product} />
            ))}
        </div>
    )
}