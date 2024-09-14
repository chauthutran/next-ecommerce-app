'use client';

import { useCurrentPage } from "@/contexts/MainUiContext";
import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";


export default function ProductCategoryFilter({data, handleOnChange}: {data: JSONObject[], handleOnChange: (filters: string[]) => void}) {

    const [selected, setSelected] = useState<string[]>([]);
    const { currentPage } = useCurrentPage();

    const getCategoryNames = (): Array<string> => {
        return Array.from(new Set(data.map(product => product.category.name)));
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } =  event.target;
        let newSelected = [...selected];

        if( checked ) {
            newSelected.push(value);
        }
        else {
            newSelected = newSelected.filter((item: string) => item !== value);
        }

        setSelected( newSelected );
        handleOnChange( newSelected );
    }

    useEffect(() => {
        setSelected([]);
    }, [currentPage.data.data]);


    return (
        <>
            {getCategoryNames().map((categoryName: string, idx: number) => (
                <div
                    key={`category_${categoryName}`}
                    className="flex items-center justify-between p-3 w-full text-xl">
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            value={categoryName}
                            onChange={(e) => handleCategoryChange(e)}
                            className="form-checkbox h-5 w-5 text-yellow-500 border-red-500 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                        />
                        <span className="text-black">{categoryName}</span>
                    </label>
                </div>
                ))}
        </>
    )
}