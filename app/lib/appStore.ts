import { JSONObject } from "./definations";
import * as Utils from "@/lib/utils";

let _configData: JSONObject = {};

export const fetchConfigData = async(): Promise<JSONObject> => {
    try {
        const response = await fetch("/config.json");
        _configData = await response.json();

        return _configData;
    }
    catch (error: any) {
        return ({status: "error", message: error.message});
    }
};

export const getConfigData = () => {
    return _configData;
}