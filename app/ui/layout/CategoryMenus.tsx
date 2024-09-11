'use client';

import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import { useEffect, useState } from "react";

export default function CategoryMenus() {

    const [categories, setCategories] = useState<JSONObject | null>(null);
    const [errMessage, setErrMessage] = useState("");
    // const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);


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
    }, [])


    if (errMessage !== "") return (<div>{errMessage}</div>);
    else if (categories == null) return (<div>Loading ...</div>);

    return (
        <div className="bg-white grid grid-cols-1 gap-4 rounded-lg px-1 py-5 border-2 border-gray-200">
            {categories.map((category: JSONObject, idx: number) => (
                <div
                    key={`category_${category._id}`}
                    className="flex items-center space-x-4 p-4 cursor-pointer text-gray-800 hover:bg-firebrick hover:text-white rounded-lg transition-all duration-300 ease-in-out"
                // onMouseEnter={() => setHoveredCategory(category.name)}
                // onMouseLeave={() => setHoveredCategory(null)}
                >
                    {/* Icon */}
                    <div className="flex items-center justify-center p-3 bg-blue-50 rounded-full border-2 border-blue-200  text-xl"
                        style={{ width: '48px', height: '48px' }}>{category.icon}</div>

                    <span className="text-xl font-semibold hidden lg:flex">{category.name}</span>


                    {/* Show category name when hovered (absolute positioning) */}
                    {/* {hoveredCategory === category.name && (
                        <div className="absolute left-full px-3 py-2 z-10 bg-blue-50 border-r border-b border-t border-blue-200 rounded-r-lg text-black shadow-xl">
                            {category.name}
                        </div>
                    )} */}
                </div>
            ))}
        </div>
    )
}