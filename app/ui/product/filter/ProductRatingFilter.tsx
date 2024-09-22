import { JSONObject } from "@/lib/definations";
import ProductRating from "../ProductRating";
import { useEffect, useState } from "react";
import { useCurrentPage } from "@/contexts/MainUiContext";

export default function ProductRatingFilter({handleOnChange}: {handleOnChange: (starNo: number | null) => void}) {

    const { currentPage } = useCurrentPage();
    const[selected, setSelected] = useState<number | null>(null);


    useEffect(() => {
        setSelected(null);
    }, [currentPage.data.data])

    
    const handleOnSelectItem = (value: number) => {
        const starNo = ( selected === value ) ? null : value; // Check for adding/removing selected item
        setSelected(starNo)
        handleOnChange(starNo);
    }

    return (
        <>
            <div className={`flex space-x-2 px-2 items-center ${selected == 4 && "bg-gray-200 rounded-sm"}`} onClick={() => handleOnSelectItem(4)}><ProductRating rating={4} /> <div className="mt-2">4 stars or more</div></div>
            <div className={`flex space-x-2 px-2 items-center ${selected == 3 && "bg-gray-200 rounded-sm"}`} onClick={() => handleOnSelectItem(3)}><ProductRating rating={3} /> <div className="mt-2">3 stars or more</div></div>
            <div className={`flex space-x-2 px-2 items-center ${selected == 2 && "bg-gray-200 rounded-sm"}`}  onClick={() => handleOnSelectItem(2)}><ProductRating rating={2} /> <div className="mt-2">2 stars or more</div></div>
            <div className={`flex space-x-2 px-2 items-center ${selected == 1 && "bg-gray-200 rounded-sm"}`}  onClick={() => handleOnSelectItem(1)}><ProductRating rating={1} /> <div className="mt-2">1 star or more</div></div>
        </>
    )
}