import {ApiConfig} from "../config/api_config";
import axios from "axios";
import {AuthenticationService} from "./authentication";


export class RoomApi {

    createRoom = async () => {
        const url = ApiConfig.ROOM_CREATE_URL
        const access_token = await new AuthenticationService().getAccessToken()
        const headers = {'Authorization': "Bearer " + access_token }
        const response = await axios.post(url, {}, {headers: headers})
        console.log("room.createRoom response", response)
        return response
    }

    join = async (roomId) => {
        const url = ApiConfig.ROOM_JOIN_URL.format(roomId)
        const response = await axios.get(url, {})
        console.log("room.join response")
        console.log(response)
        return response
    }

    deleteRoom = async (roomId) => {
        const url = ApiConfig.ROOM_DELETE_URL.format(roomId)
        const response = await axios.delete(url, {})
        console.log("room.deleteRoom response")
        console.log(response)
        return response
    }

    getRoomInfo = async (roomId) => {
        const url = ApiConfig.ROOM_INFO_URL.format(roomId)
        const response = await axios.get(url, {})
        console.log("room.getRoomInfo response")
        console.log(response)
        return response
    }
}