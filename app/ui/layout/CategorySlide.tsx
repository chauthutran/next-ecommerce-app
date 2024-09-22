'use client';

import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import { useEffect, useState } from "react";
import { FiList } from "react-icons/fi";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";


export default function CategorySlide() {

    const { currentPage, setCurrentPage } = useCurrentPage();
    const [categories, setCategories] = useState<JSONObject | null>(null);
    const [errMessage, setErrMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [selectedId, setSelectedId] = useState("");


    const fetchCategories = async () => {
        const response: JSONObject = await dbService.fetchCategories();

        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setCategories(response.data);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        
    }, [currentPage])

    const handleCategorySelected = (category: JSONObject) => {
        setSelectedId( category._id );
        setCurrentPage(Constant.PAGE_PRODUCTS_BY_CATEGORY, category);
    }

    // Toggle the category list visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    if (errMessage !== "") return (<div>{errMessage}</div>);
    else if (categories == null) return (<div>Loading ...</div>);

    return (
        <div className="relative flex w-full lg:w-fit" style={{ height: 'calc(100vh - 142px)' }}>
            {/* Category list with background color and sliding effect */}
            <div
                className={`grid grid-cols-1 gap-4 border border-gray-200
                    absolute top-0 left-0 lg:relative h-full w-72 transform transition-transform duration-500 ease-in-out 
                    ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-auto lg:grid`}
            >
                <div className="bg-white shadow-xl shadow-color-2 lg:shadow-none h-full overflow-y-auto scrollbar-custom">
                    {categories.map((category: JSONObject, idx: number) => (
                        <div
                            key={`category_${category._id}`}
                            className={`flex items-center space-x-4 p-3 my-3 cursor-pointer text-color-2 hover:bg-gray-100 hover:text-black transition-all duration-300 ease-in-out ${selectedId === category._id && "bg-color-2 text-white" }`}
                            onClick={() => handleCategorySelected(category)}
                        >
                            {/* Icon */}
                            <div
                                className="flex items-center justify-center p-3 bg-color-1 rounded-full border-2 border-blue-200 text-xl"
                                style={{ width: '48px', height: '48px' }}
                            >
                                {category.icon}
                            </div>
                            <span className="text-xl">{category.name}</span>
                        </div>
                    ))}
                </div>

                {/* Button to toggle visibility on small screens */}
                <button
                    className="text-black bg-bright-yellow rounded-r-md p-1 shadow-lg shadow-mustard-yellow lg:hidden absolute left-[285px] transition-colors hover:bg-mustard-yellow"
                    onClick={toggleVisibility}
                >
                    <FiList className="size-8" />
                </button>
            </div>
        </div>
    )
}