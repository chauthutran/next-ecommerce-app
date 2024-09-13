'use client';

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProductPriceFilter from "../product/ProductPriceFilter";
import { BiFilter } from "react-icons/bi";
import ProductRatingFilter from "../product/ProductRatingFilter";


export default function ProductFilters({data}: {data: JSONObject[]}) {

    // const [branches, setBranches] = useState<JSONObject | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Toggle the category list visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const getBranches = (): Array<string> => {
        return Array.from(new Set(data.map(product => product.brand)));
        // setBranches(list);
    }

    return (
        <div className="relative flex w-fit lg:my-3">

    {/* Branch list with background color and sliding effect */}
    <div
        className={`grid grid-cols-1 gap-4 rounded-lg border-2 border-gray-200
            absolute top-0 left-0 h-full w-72 transform transition-transform duration-500 ease-in-out
            ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-auto lg:grid`} // Sliding effect and positioning
    >
        <div className="p-4 shadow-xl shadow-bright-yellow lg:shadow-none bg-white flex-col space-y-3">
           
            {/* For Price list */}
            <div className="">
                <div className="text-xl py-1 font-semibold mb-2 uppercase">Price</div>
                {/* Price list */}
                <div
                    className="scrollbar-custom flex flex-col items-start space-y-2 text-black transition-all duration-300 ease-in-out"
                >
                    <ProductPriceFilter />
                </div>
            </div>

            <hr />

            {/* For branch list */}
            <div className="">
                <div className="text-xl py-1 font-semibold mb-4 uppercase">Branch</div>

                {/* Scrollable branch list */}
                <div
                     className="scrollbar-custom flex flex-col items-start space-y-1 text-black transition-all duration-300 ease-in-out max-h-60 overflow-y-auto"
                >
                    {getBranches().map((branch: string, idx: number) => (
                        <div
                            key={`branch_${branch}`}
                            className="flex items-center justify-between p-3 w-full text-xl">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-yellow-500 border-red-500 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                                />
                                <span className="text-black">{branch}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>


            <hr />

            {/* For Rating list */}
            <div className="">
                <div className="text-xl py-1 font-semibold mb-2 uppercase">Rating</div>
                {/* Rating list */}
                <div
                    className="scrollbar-custom flex flex-col items-start space-y-1 text-black transition-all duration-300 ease-in-out"
                >
                    <ProductRatingFilter />
                </div>
            </div>


        </div>

        {/* Button to toggle visibility on small screens */}
        <button
            className="text-black bg-bright-yellow rounded-r-md p-1 shadow-lg shadow-mustard-yellow lg:hidden absolute left-[285px] transition-colors hover:bg-color-2"
            onClick={toggleVisibility} >
            <BiFilter className="size-8" />
        </button>
    </div>
</div>


        // <div className="relative flex w-fit lg:my-3">

        //     {/* Branch list with background color and sliding effect */}
        //     <div
        //         className={`grid grid-cols-1 gap-4 rounded-lg border-2 border-gray-200
        //     absolute top-0 left-0 h-full w-72 transform transition-transform duration-500 ease-in-out
        //     ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-auto lg:grid`} // Sliding effect and positioning
        //     >
        //         <div className="bg-white shadow-xl shadow-bright-yellow lg:shadow-none">

        //             {branches === null && <div>Loading ...</div>}

        //             <div className="text-xl">Branch</div>

        //             <div
        //                 className="flex items-center space-x-4 p-4 cursor-pointer text-black hover:bg-bright-yellow hover:text-black transition-all duration-300 ease-in-out"
        //             >
        //                 <div className="bg-white shadow-xl max-h-60 scroll-auto">
        //                     {branches !== null && branches.map((branch: string, idx: number) => (
        //                         <div
        //                             key={`branch_${branch}`}
        //                             className="flex items-center justify-center p-3 bg-yellow-50 text-xl">
        //                             <label>{branch}</label>
        //                             <input type="checkbox"></input>
        //                         </div>
        //                     ))}</div>
        //             </div>
        //         </div>

        //         {/* Button to toggle visibility on small screens */}
        //         <button
        //             className="text-white bg-bright-yellow rounded-r-md p-1 shadow-lg shadow-mustard-yellow lg:hidden absolute left-[285px] transition-colors hover:bg-color-2"
        //             onClick={toggleVisibility} >
        //             <FiList className="size-8" />
        //         </button>
        //     </div>
        // </div>
    )
}