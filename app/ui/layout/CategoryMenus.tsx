'use client';

import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { TbLayoutListFilled } from "react-icons/tb";
import { PiListBold } from "react-icons/pi";
import { FiList } from "react-icons/fi";


export default function CategoryMenus() {

    const [categories, setCategories] = useState<JSONObject | null>(null);
    const [errMessage, setErrMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);


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

    // Toggle the category list visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    if (errMessage !== "") return (<div>{errMessage}</div>);
    else if (categories == null) return (<div>Loading ...</div>);

    return (
        <div className="relative flex w-full lg:w-fit" style={{ height: 'calc(100vh - 150px)' }}>
            {/* Category list with background color and sliding effect */}
            <div
                className={`grid grid-cols-1 gap-4 rounded-lg border-2 border-gray-200 
                    absolute top-0 left-0 lg:relative h-full w-72 transform transition-transform duration-500 ease-in-out 
                    ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-auto lg:grid`}
            >
                <div className="bg-white shadow-xl shadow-bright-yellow lg:shadow-none h-full overflow-y-auto scrollbar-custom">
                    {categories.map((category: JSONObject, idx: number) => (
                        <div
                            key={`category_${category._id}`}
                            className="flex items-center space-x-4 p-4 cursor-pointer text-black hover:bg-bright-yellow hover:text-black transition-all duration-300 ease-in-out"
                        >
                            {/* Icon */}
                            <div
                                className="flex items-center justify-center p-3 bg-yellow-50 rounded-full border-2 border-yellow-200 text-xl"
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
                    className="text-black bg-bright-yellow rounded-r-md p-1 shadow-lg shadow-mustard-yellow lg:hidden absolute left-[285px] transition-colors hover:bg-color-2"
                    onClick={toggleVisibility}
                >
                    <FiList className="size-8" />
                </button>
            </div>
        </div>
    )
}