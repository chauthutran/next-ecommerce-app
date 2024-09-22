'use client';

import { useCurrentPage } from "@/contexts/MainUiContext";
import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";


export default function ProductBrandFilter({data, handleOnChange}: {data: JSONObject[], handleOnChange: (filters: string[]) => void}) {

    const [selected, setSelected] = useState<string[]>([]);
    const { currentPage } = useCurrentPage();

    useEffect(() => {
        setSelected([]);
    }, [currentPage.data.data]);

    const getBrandes = (): Array<string> => {
        return Array.from(new Set(data.map(product => product.brand)));
    }

    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            {getBrandes().map((brand: string, idx: number) => (
                <div
                    key={`brand_${brand}`}
                    className="flex items-center justify-between px-2 py-1 w-full text-xl">
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={selected.indexOf(brand)>=0}
                            value={brand}
                            onChange={(e) => handleBrandChange(e)}
                            className="form-checkbox h-5 w-5 text-yellow-500 border-red-500 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                        />
                        <span>{brand}</span>
                    </label>
                </div>
            ))}
        </>
    )
}