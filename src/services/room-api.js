import {ApiConfig} from "../config/api_config";
import axios from "axios";
import {AuthenticationService} from "./authentication";


export class RoomApi {

    createRoom = async () => {
        const url = ApiConfig.ROOM_CREATE_URL
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.post(url, {}, {headers: headers})
        console.log("RoomApi.createRoom response", response)
        return response
    }

    listRooms = async () => {
        const url = ApiConfig.ROOM_LIST_URL
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.get(url, {headers: headers})
        console.log("RoomApi.listRooms response", response)
        return response
    }

    getInfo = async (roomId) => {
        const url = ApiConfig.ROOM_INFO_URL.format("{roomId}", roomId)
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.get(url, {headers: headers})
        console.log("RoomApi.getInfo response")
        console.log(response)
        return response
    }

    join = async (roomId) => {
        const url = ApiConfig.ROOM_JOIN_URL.format("{roomId}", roomId)
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.get(url, {headers: headers})
        console.log("RoomApi.join response")
        console.log(response)
        return response
    }

    deleteRoom = async (roomId) => {
        const headers = await new AuthenticationService().getAuthHeaders()
        const url = ApiConfig.ROOM_DELETE_URL.format("{roomId}", roomId)
        const response = await axios.delete(url, {headers: headers})
        console.log("RoomApi.deleteRoom response")
        console.log(response)
        return response
    }

    getJoinedPlayers = async (roomId) => {
        const url = ApiConfig.ROOM_JOINED_USERS_URL.replace("{roomId}", roomId)
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.get(url, {headers: headers})
        console.log("RoomApi.getJoinedPlayers response")
        console.log(response)
        return response
    }
}