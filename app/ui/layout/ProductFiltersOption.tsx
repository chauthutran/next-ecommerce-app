'use client';

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProductPriceFilter from "../product/filter/ProductPriceFilter";
import { BiFilter } from "react-icons/bi";
import ProductRatingFilter from "../product/filter/ProductRatingFilter";
import ProductCategoryFilter from "../product/filter/ProductCategoryFilter";
import ProductBrandFilter from "../product/filter/ProductBrandFilter";


export default function ProductFiltersOption({ data, handleSelectFilters }: { data: JSONObject[], handleSelectFilters: (JSONObject: JSONObject) => void }) {

    const [filters, setFilters] = useState<JSONObject>({ price: {maxPrice: null, minPrice: null}, brands: [], categoies: [], rating: null });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setFilters({ price: {maxPrice: null, minPrice: null}, brands: [], categoies: [], rating: null });
    }, [data]);

    // Toggle the category list visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const setPriceFilter = (priceFilter: JSONObject) => {
        filters.price = priceFilter;
        handleSelectFilters(filters);
    }

    const handlBrandChange = (filterBrands: string[]) => {
        filters.brands = filterBrands;
        handleSelectFilters(filters);
    }

    const handleCategoryChange = (filterCategories: string[]) => {
        filters.categoies = filterCategories;
        handleSelectFilters(filters);
    }

    const handleRatingChange = (value: number | null) => {
        filters.rating = value;
        handleSelectFilters(filters);
    }


    return (
        <div className="relative flex w-fit lg:my-3">

            <div
                className={`grid grid-cols-1 gap-4 rounded-lg border-2 border-gray-200
            absolute top-0 left-0 h-full w-72 transform transition-transform duration-500 ease-in-out
            ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-auto lg:grid`} // Sliding effect and positioning
            >
                <div className="p-4 shadow-xl shadow-bright-yellow lg:shadow-none bg-white flex-col space-y-3">

                    {/* For Price list */}
                    <div className="">
                        <div className="text-xl font-semibold uppercase">Price</div>
                        {/* Price list */}
                        <div
                            className="scrollbar-custom flex flex-col items-start text-black transition-all duration-300 ease-in-out space-y-3 ml-3"
                        >
                            <ProductPriceFilter handleOnChange={(priceFilter) => setPriceFilter(priceFilter)}/>
                        </div>
                    </div>

                    <hr />

                    {/* For brand list */}
                    <div className="">
                        <div className="text-xl py-1 font-semibold mb-4 uppercase">Brand</div>

                        {/* Scrollable brand list */}
                        <div
                            className="scrollbar-custom flex flex-col items-start space-y-1 text-black transition-all duration-300 ease-in-out max-h-60 overflow-y-auto"
                        >
                           <ProductBrandFilter data={data} handleOnChange={(filterBrands: string[]) => {handlBrandChange(filterBrands)}} />
                        </div>
                    </div>

                    <hr />

                    {/* For Category list */}
                    <div>
                        <div className="text-xl py-1 font-semibold mb-4 uppercase">Category</div>

                        {/* Scrollable Category list */}
                        <div
                            className="scrollbar-custom flex flex-col items-start space-y-1 text-black transition-all duration-300 ease-in-out max-h-60 overflow-y-auto"
                        >
                            <ProductCategoryFilter data={data} handleOnChange={(filterCategories: string[]) => {handleCategoryChange(filterCategories)}} />
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
                            <ProductRatingFilter handleOnChange={(value) => handleRatingChange(value)}/>
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
    )
}