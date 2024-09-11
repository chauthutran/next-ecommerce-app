'use client';

import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import { useEffect, useState } from "react";

export default function CategoryMenus() {

    const [categories, setCategories] = useState<JSONObject | null>(null);
    const [errMessage, setErrMessage] = useState("");
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);


    const fetchCategories = async () => {
        const response: JSONObject = await dbService.fetchCategories();
        console.log(response);
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
        <div className="bg-white grid grid-cols-1 gap-4 rounded-lg px-3 py-5">
            {categories.map((category: JSONObject, idx: number) => (
                <div
                    key={`category_${category._id}`}
                    className="relative flex flex-row cursor-pointer whitespace-nowrap"
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                >
                    {/* Icon */}
                    <div className="px-1 py-2 hover:border-l hover:border-t hover:border-b hover:border-slate-300 rounded-l-lg hover:bg-lime_green text-2xl">{category.icon}</div>

                    {/* Show category name when hovered (absolute positioning) */}
                    {hoveredCategory === category.name && (
                        <div className="absolute left-full px-3 py-2 text-gray-700 z-10 border-r border-t border-b border-slate-300 bg-lime_green rounded-r-lg font-semibold  text-2xl">
                            {category.name}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}