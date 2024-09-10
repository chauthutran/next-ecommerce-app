'use client';

import { JSONObject } from "@/lib/definations";
import * as dbService from "@/lib/dbService";
import { useEffect, useState } from "react";


export default function CategoryMenus() {

    const [categories, setCategories] = useState<JSONObject | null>(null);
    const [errMessage, setErrMessage] = useState("");

    const fetchCategories = async () => {
        const response: JSONObject = await dbService.fetchCategories();
        // const response: JSONObject = { status: "success", data: [] };
        console.log(response);
        if( response.status != "success" ) {
            setErrMessage( response.message );
        }
        else {
            setCategories( response.data );
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])


    if( errMessage !== "" ) return ( <div>{errMessage}</div>);
    else if( categories == null ) return ( <div>Loading ...</div>);

    return (
        <div className="bg-white grid grid-cols-1 gap-4 font-semibold rounded-lg px-4 py-5 min-w-72">
            {categories.map((category: JSONObject, idx: number) => (
                <div 
                    key={`category_${category._id}`}
                    className="cursor-pointer border-b border-light-gray py-2 whitespace-nowrap"
                >{category.name}</div>
            ))}
        </div>
    )
}