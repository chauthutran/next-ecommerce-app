import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import ProductList from "./product/ProductList";
import { RiBubbleChartFill } from "react-icons/ri";
import { useCurrentPage } from "@/contexts/MainUiContext";
import ProductFiltersOption from "./layout/ProductFiltersOption";


export default function ProductSearchPage() {

    const { currentPage } = useCurrentPage();
    const [filteredList, setFilteredList] = useState<JSONObject[]>(currentPage.data.data);
   
    // Reset filter options
    useEffect(() => {
        setFilteredList( currentPage.data.data );
    }, [currentPage.data.data]);


    if (currentPage.data!.status === "error") return (<div className="m-4 text-red-600 text-lg">{currentPage.data!.message}</div>);

    const filterData = (filters: JSONObject) => {
        const resultList = currentPage.data.data;
        
        console.log("===== filters", filters);

        const resolvedData = resultList.filter((product: JSONObject) => {
            const price = product.price;
            const brand = product.brand;
            const rating = product.rating;
            const categoryName = product.category.name;
            
            return (
              (filters.price.minPrice === null || price >= filters.price.minPrice)
              && (filters.price.maxPrice === null || price <= filters.price.maxPrice)
              && (filters.categoies.length === 0 || filters.categoies.indexOf(categoryName) >= 0)
              && (filters.brands.length === 0 || filters.brands.indexOf(brand) >= 0)
              && (filters.rating === null || rating >= filters.rating )
            );
        })

        console.log("resolvedData", resolvedData);
        setFilteredList( resolvedData );
    }

    return (
        <>
            <nav className="flex items-center space-x-2 px-6 py-2 bg-mustard-yellow text-black text-lg">

                <div className="flex space-x-1 items-center">
                    <RiBubbleChartFill />
                    {filteredList.length == 0 && <div>Sorry, no products match your search.</div>}
                    {filteredList.length == 1 && <div>1 product found</div>}
                    {filteredList.length > 1 && <div>{filteredList.length} products found</div>}
                </div>
            </nav>

            <div className="flex space-x-5">
                <div className="">
                    <ProductFiltersOption data={currentPage.data.data} handleSelectFilters={(filters) => filterData(filters)} />
                </div>
                <div className="col-span-3 flex-1 bg-white rounded-lg p-3 m-3">

                    <div className="font-semibold text-2xl mt-5 mb-10 border-b border-slate-400 pb-3 flex">
                        <RiBubbleChartFill className="text-firebrick mr-2" />
                        Search Result
                    </div>

                    <ProductList data={filteredList} />
                </div>
            </div>
        </>
    )
}
