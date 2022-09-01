import {ApiConfig} from "../config/api_config";
import {AuthenticationService} from "./authentication";
import axios from "axios";


export class UserServiceApi {
    constructor() {
        if (UserServiceApi._instance) {
            return UserServiceApi._instance
        }
        UserServiceApi._instance = this
    }

    getUserDetails = async () => {
        if(UserServiceApi._details){
            return UserServiceApi._details
        }
        const url = ApiConfig.USER_PROFILE_URL
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.get(url, {headers: headers})
        if(response.data != null){
            UserServiceApi._details= response.data
        }
        return UserServiceApi._details

    }
}