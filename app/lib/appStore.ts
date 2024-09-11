import { JSONObject } from "./definations";
import * as Utils from "@/lib/utils";


let _product: JSONObject = {};

export const setProduct = (product: JSONObject) => {
    _product = product;
}

export const getProduct = () => {
    return _product;
}