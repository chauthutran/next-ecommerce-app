import { useCurrentPage } from "@/contexts/MainUiContext";
import { JSONObject } from "@/lib/definations";
import { useEffect, useRef, useState } from "react";

type FilterOptions = {
    priceRange: string; // Need this one, just for displaying the selected item properly
    minPrice: number | null;
    maxPrice: number | null;
};

export default function ProductPriceFilter({handleOnChange}: {handleOnChange: (data: JSONObject) => void}) {


    const inputMinPriceRef = useRef<HTMLInputElement>(null);
    const inputMaxPriceRef = useRef<HTMLInputElement>(null);

    const { currentPage } = useCurrentPage();
    const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
        priceRange: "",
        minPrice: null,
        maxPrice: null,
    });

    useEffect(() => {
        setSelectedFilters({ priceRange: "",
            minPrice: null,
            maxPrice: null });
    }, [currentPage.data.data]);
    

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if( value === "" ) {
            setSelectedFilters({minPrice: null, maxPrice: null, priceRange: ""});
            handleOnChange({minPrice: null, maxPrice: null});
        }
        else {
            let max = parseFloat(value.replace("<=", ""));
            let range = value;

            setSelectedFilters({minPrice: 0, maxPrice: max, priceRange: range});
            handleOnChange({minPrice: 0, maxPrice: max});
        }
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let min: number | null = null;
        let max: number | null = null;
        if (inputMinPriceRef.current) {
            let value = inputMinPriceRef.current.value;
            min = ( value === "" ) ? null : parseFloat( inputMinPriceRef.current.value );
        }

        if (inputMaxPriceRef.current) {
            let value = inputMaxPriceRef.current.value;
            max = ( value === "" ) ? null : parseFloat( inputMaxPriceRef.current.value );
        }

        setSelectedFilters({minPrice: min, maxPrice: max, priceRange: ""});
        handleOnChange({minPrice: min, maxPrice: max});
    };

    const getInputMaxValue = () => {
        if( selectedFilters.priceRange !== "" ) return "";
        
        if( selectedFilters.maxPrice === null ) return "";

        return selectedFilters.maxPrice;
    } 

    
    const getInputMinValue = () => {
        if( selectedFilters.priceRange !== "" ) return "";
        
        if( selectedFilters.minPrice === null ) return "";

        return selectedFilters.minPrice;
    } 

    return (
        <>
        <div
             className="flex items-center justify-between w-full ">
                 <label className="flex items-center space-x-3">
                 <input
                     type="radio"
                     name="priceFilter"
                     value=""
                     checked={selectedFilters.priceRange == ""}
                     onChange={handleCheckboxChange}
                     className="form-checkbox h-5 w-5 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                 />
                 <span className="text-black">None</span>
             </label>
         </div>

           <div
                className="flex items-center justify-between w-full ">
                    <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        name="priceFilter"
                        value="<= 1"
                        checked={selectedFilters.priceRange == "<= 1"}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                    />
                    <span className="text-black">1$ or Less</span>
                </label>
            </div>

            <div
                className="flex items-center justify-between w-full ">
                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        name="priceFilter"
                        value="<= 10"
                        checked={selectedFilters.priceRange == "<= 10"}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                    />
                    <span className="text-black">10$ or Less</span>
                </label>
            </div>

            <div
                className="flex items-center justify-between w-full ">
                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        name="priceFilter"
                        value="<= 100"
                        checked={selectedFilters.priceRange == "<= 100"}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                    />
                    <span className="text-black">100$ or Less</span>
                </label>
            </div>

            <div
                className="flex items-center justify-between w-full ">
                <input
                    ref={inputMinPriceRef}
                    type="number"
                    name="minPrice"
                    value={getInputMinValue()}
                    onChange={(e) => handlePriceChange(e)}
                    className="border border-gray-400 p-1 w-24 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                />
                <span className="text-black mx-2">~</span>
                <input
                    ref={inputMaxPriceRef}
                    type="number"
                    name="maxPrice"
                    value={getInputMaxValue()}
                    onChange={handlePriceChange}
                    className="border border-gray-400 p-1 w-24 rounded focus:ring focus:ring-yellow-400 focus:outline-none transition duration-200"
                />
            </div>
        </>
    )
}