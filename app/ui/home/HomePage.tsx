'use client';

import CategoryMenus from "../layout/CategoryMenus";
import TopRatingProducts from "./TopRatingProducts";

export default function HomePage() {

    return (
        <div className="m-3 flex space-x-5">
            <div><CategoryMenus /></div>
            <div className="col-span-3 flex-1 bg-white rounded-lg p-3">
                <TopRatingProducts />
            </div>
        </div>
    )
}