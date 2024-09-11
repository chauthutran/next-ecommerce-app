import { JSONObject } from "./definations";
import * as Utils from "@/lib/utils";


let _product: JSONObject = {};
let _searchKey: string = "";

export const setProduct = (product: JSONObject) => {
    _product = product;
}

export const getProduct = () => {
    return _product;
}

export const setSearchKey = (searchKey: string) => {
    _searchKey = searchKey;
}
export const getSearchKey = () => {
    return _searchKey;
}