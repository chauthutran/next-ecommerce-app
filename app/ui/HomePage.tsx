'use client';

import { useEffect, useState } from "react";
import CategoryMenus from "./layout/CategoryMenus";
import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import ProductList from "./product/ProductList";
import { RiBubbleChartFill } from "react-icons/ri";
import * as AppStore from "@/lib/appStore";


export default function HomePage() {

    const topRatingProductNo = AppStore.getConfigData().topRating;
    const latestProductNo = AppStore.getConfigData().latestProduct;

    const [topRatingProducts, setTopRatingProducts] = useState<JSONObject[]>([]);
    const [latestProducts, setLatestProducts] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");

    const fetchTopRatingProducts = async () => {
        const response: JSONObject = await dbService.fetchTopRatingProducts(topRatingProductNo);
        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setTopRatingProducts(response.data);
        }
    }

    const fetchLatestProducts = async () => {
        const response: JSONObject = await dbService.fetchLatestProducts(latestProductNo);
        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setLatestProducts(response.data);
        }
    }

    useEffect(() => {
        fetchTopRatingProducts();
        fetchLatestProducts();
    }, [])


    if (errMessage !== "") return (<div>{errMessage}</div>);

    return (
        <div className="">
            {/* Make CategoryMenus fixed */}
            <div className="fixed w-[250px]">
                <CategoryMenus />
            </div>

            {/* Adjust the margin-left for the main content so it doesn't overlap */}
            <div className=" bg-white rounded-lg p-3 lg:ml-[260px] my-3">
                <div className="font-semibold text-2xl mt-5 mb-10 border-b border-slate-400 pb-3 flex">
                    <RiBubbleChartFill className="text-firebrick mr-2" />
                    Top rating products
                </div>
                <ProductList data={topRatingProducts} />

                <div className="font-semibold text-2xl mt-10 mb-10 border-b border-slate-400 pb-3 flex">
                    <RiBubbleChartFill className="text-firebrick mr-2" />
                    Latest products
                </div>
                <ProductList data={latestProducts} />
            </div>
        </div>
    )
}