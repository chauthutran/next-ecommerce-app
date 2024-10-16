import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import Image from 'next/image';
import ProductItemIntro from "./ProductItemIntro";


export default function ProductList({data}: {data: JSONObject[]}) {

    return (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {data.map((product: JSONObject, idx: number) => (
                <ProductItemIntro key={`product_${product._id}`} data={product} />
            ))}
        </div>
    )
}
