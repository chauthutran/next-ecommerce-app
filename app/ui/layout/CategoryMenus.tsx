'use client';

import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import { useEffect, useState } from "react";
import { FiList } from "react-icons/fi";
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";


export default function CategoryMenus() {

    const { currentPage, setCurrentPage } = useCurrentPage();
    const [categories, setCategories] = useState<JSONObject | null>(null);
    const [errMessage, setErrMessage] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [isDropdownOpen, setDropdownOpen] = useState(false);


    const fetchlist = async () => {
        const response: JSONObject = await dbService.fetchCategories();

        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setCategories(response.data);
        }
    }

    useEffect(() => {
        fetchlist();
    }, []);

    useEffect(() => {

    }, [currentPage])

    const handleCategorySelected = (category: JSONObject) => {
        setSelectedId(category._id);
        setCurrentPage(Constant.PAGE_PRODUCTS_BY_CATEGORY, category);
        setDropdownOpen(false);
    }

    if (errMessage !== "") return (<div>{errMessage}</div>);
    else if (categories == null) return (<div>Loading ...</div>);

    return (
        <div className="flex relative">

            <div className="relative">
                <button
                    className="p-1 cursor-pointer flex space-x-1 items-center bg-color-17 text-color-1 rounded"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                    <BiCategoryAlt size={23} />
                    {/* {!isDropdownOpen && <IoMdArrowDropup />}
                    {isDropdownOpen && <IoMdArrowDropdown />} */}
                </button>

                {isDropdownOpen && (
                    <div className="absolute left-0 text-black py-2 h-72 w-52">
                        <div className="overflow-y-auto h-72 bg-white shadow-2xl shadow-color-2 border-2 rounded-b-md scrollbar-custom ">
                            {categories.map((category: JSONObject, idx: number) => (
                                <div
                                    key={`category_${category._id}`}
                                    className={`flex items-center space-x-2 px-3 py-2 cursor-pointer text-color-2 hover:bg-color-1 hover:text-black transition-all duration-300 ease-in-out ${selectedId === category._id && "bg-color-2 text-white"}`}
                                    onClick={() => handleCategorySelected(category)}
                                >
                                    {/* Icon */}
                                    <div className={`flex items-center cursor-pointer text-color-2 hover:bg-gray-100 hover:text-black transition-all duration-300 ease-in-out ${selectedId === category._id && "bg-color-2 text-white"}`}
                                    >
                                        {category.icon}
                                    </div>
                                    <span>{category.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}