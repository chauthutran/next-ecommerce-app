'use client';

import { useEffect, useState } from "react";
import CategoryMenus from "./layout/CategoryMenus";
import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import ProductList from "./product/ProductList";


export default function HomePage() {

    const productNo = 10;

    const [topRatingProducts, setTopRatingProducts] = useState<JSONObject[]>([]);
    const [latestProducts, setLatestProducts] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");

    const fetchTopRatingProducts = async () => {
        const response: JSONObject = await dbService.fetchTopRatingProducts(productNo);
        if( response.status != "success" ) {
            setErrMessage( response.message );
        }
        else {
            setTopRatingProducts( response.data );
        }
    }

    const fetchLatestProducts = async () => {
        const response: JSONObject = await dbService.fetchLatestProducts(productNo);
        if( response.status != "success" ) {
            setErrMessage( response.message );
        }
        else {
            setLatestProducts( response.data );
        }
    }

    useEffect(() => {
        fetchTopRatingProducts();
        fetchLatestProducts();
    }, [])

    
    if( errMessage !== "" ) return ( <div>{errMessage}</div>);

    return (
        <div className="flex space-x-5">
            <div className=""><CategoryMenus /></div>
            <div className="col-span-3 flex-1 bg-white rounded-lg p-3 m-3">
                <div className="font-semibold text-2xl mt-5 mb-10 border-b border-slate-400 pb-3">Top rating products</div>
                <ProductList data={topRatingProducts} />

                <div className="font-semibold text-2xl mt-20 mb-10 border-b border-slate-400 pb-3">Latest products</div>
                <ProductList data={latestProducts} />
            </div>
        </div>
    )
}