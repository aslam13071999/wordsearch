import {ApiConfig} from "../config/api_config";
import axios from "axios";
import {AuthenticationService} from "./authentication";


export class CategoryApi {
    listCategories = async () => {
        const url = ApiConfig.CATEGORIES_LIST_URL
        const access_token = await new AuthenticationService().getAccessToken()
        const headers = {'Authorization': "Bearer " + access_token }
        const response = await axios.get(url, {headers: headers})
        console.log("CategoryApi.listCategories response", response)
        return response

    }
}