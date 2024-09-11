import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import Image from 'next/image';
import ProductItemIntro from "./ProductItemIntro";


export default function ProductList({data}: {data: JSONObject[]}) {

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {data.map((product: JSONObject, idx: number) => (
                <ProductItemIntro key={`product_${product._id}`} data={product} />
            ))}
        </div>
    )
}
