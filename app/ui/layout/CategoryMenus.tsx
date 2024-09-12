'use client';

import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";


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
        <>
            <button 
                className="text-white block lg:hidden bg-firebrick rounded-r-md px-1 py-2 absolute left-0 shadow-md shadow-firebrick" 
                onClick={toggleVisibility}>
                    <MdCategory className="transform rotate-90 size-8" />
            </button>

            <div className={`bg-white grid grid-cols-1 gap-4 rounded-lg px-1 py-5 border-2 border-gray-200
        ${isVisible ? 'grid' : 'hidden'} lg:grid`} >
                {categories.map((category: JSONObject, idx: number) => (
                    <div
                        key={`category_${category._id}`}
                        className="flex items-center space-x-4 p-4 cursor-pointer text-gray-700 hover:bg-gray-300 rounded-lg transition-all duration-300 ease-in-out"
                    >
                        {/* Icon */}
                        <div className="flex items-center justify-center p-3 bg-blue-50 rounded-full border-2 border-blue-200  text-xl"
                            style={{ width: '48px', height: '48px' }}>{category.icon}</div>

                        <span className="text-xl font-semibold">{category.name}</span>
                    </div>
                ))}
            </div>
        </>
    )
}