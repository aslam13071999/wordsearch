import axios from "axios";
import {ApiConfig} from "../config/api_config";

export class AuthenticationService {

    constructor() { // making single instantiation for this class.
        if(AuthenticationService._instance){
            return AuthenticationService._instance
        }
        AuthenticationService._instance = this
        this.access_token = null
        this.refresh_token = null
        this.last_refresh_at = null
    }

    authenticate = async (username, password) => {
        const url = ApiConfig.API_URL + "/api/token/"
        const response = await axios.post(url,
            {'username': username, 'password': password}
        )
        console.log("AuthenticationService.authenticate response", response)
        this.access_token = response.data['access']
        this.refresh_token = response.data['refresh']
        this.last_refresh_at = Date.now()
    }

    refreshAccessToken = async () => {
        const url = ApiConfig.API_URL + "/api/token/refresh/"
        const response = await axios.post(url, {'refresh': this.refresh_token})
        console.log("AuthenticationService.refreshAccessToken response", response)
        this.access_token = response.data.access
        this.last_refresh_at = Date.now()

    }

    getAccessToken = async () => {
        if (this.access_token == null){
            await this.authenticate('asif', 'rgukt123')
        }
        const current_time = Date.now()
        const next_refresh = this.last_refresh_at + (5 * 60 * 1000)
        if (next_refresh <= current_time) {
            console.log("token is expired, refreshing")
            await this.refreshAccessToken()
        }
        return this.access_token
    }

    getAuthHeaders = async () => {
        const access_token = await this.getAccessToken()
        return {
            "Authorization": "Bearer " + access_token,
        }
    }
}