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
        setSelectedId(category._id);
        setCurrentPage(Constant.PAGE_PRODUCTS_BY_CATEGORY, category);
    }

    if (errMessage !== "") return (<div>{errMessage}</div>);
    else if (categories == null) return (<div>Loading ...</div>);

    return (
        <div className="flex w-full lg:w-fit">
            <div className="bg-white h-full overflow-y-auto scrollbar-custom">
                {categories.map((category: JSONObject, idx: number) => (
                    <div
                        key={`category_${category._id}`}
                        className={`flex items-center space-x-2 p-3 pl-1 mr-2 my-3 border-b cursor-pointer text-color-2 hover:bg-gray-200 hover:text-black transition-all duration-300 ease-in-out ${selectedId === category._id && "bg-color-2 text-white rounded-sm"}`}
                        onClick={() => handleCategorySelected(category)}
                    >
                        <div>
                            {category.icon}
                        </div>
                        <span className="">{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}