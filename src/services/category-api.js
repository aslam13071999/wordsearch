import {ApiConfig} from "../config/api_config";
import axios from "axios";
import {AuthenticationService} from "./authentication";


export class CategoryApi {
    listCategories = async (detail = false) => {
        const url = ApiConfig.CATEGORIES_LIST_URL
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.get(url, {headers: headers, params: {detail: detail}})
        console.log("CategoryApi.listCategories response", response)
        return response
    }


}