import { JSONObject } from "./definations";
import * as Utils from "@/lib/utils";


let _product: JSONObject = {};
let _products: JSONObject[] = [];

export const setProduct = (product: JSONObject) => {
    _product = product;
}

export const getProduct = () => {
    return _product;
}

export const setProducts = (products: JSONObject[]) => {
    _products = products;
}
export const getProducts = () => {
    return _products;
}