import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";
import ProductList from "./product/ProductList";


export default function ProductSearchPage({keyword}: {keyword: string}) {

    const [searchedProducts, setSearchedProducts] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");
console.log(keyword);
    const fetchSimilarProducts = async () => {
        const response: JSONObject = await dbService.searchProducts(keyword);
        console.log(response);
        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setSearchedProducts(response.data);
        }
    }

    useEffect(() => {
        fetchSimilarProducts();
    }, [])
    
    
    if( errMessage !== "" ) return ( <div className="m-4 text-red-600 text-lg">{errMessage}</div>);

    return (
        <>
            {searchedProducts.length == 1 && <div>There is one product found</div>}
            {searchedProducts.length > 1 && <div>There is {searchedProducts.length} product found</div>}

            <ProductList data={searchedProducts} />
        </>
    )
}