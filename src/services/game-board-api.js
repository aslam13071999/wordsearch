import {ApiConfig} from "../config/api_config";
import {AuthenticationService} from "./authentication";
import axios from "axios";


export class GameBoardApi{

    createBoard = async (roomId, category, board_size, difficulty) => {
        const url = ApiConfig.GAME_BOARD_CREATE_URL
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.post(url,
            {
                "room_id": roomId,
                category,
                board_size,
                difficulty
            },
            {headers: headers}
        )
        console.log("GameboardApi.createBoard response", response)
        return response

    }

    getLatestBoard = async( roomId) => {
        const url = ApiConfig.GAME_BOARD_LATEST_URL
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.get(url, {headers: headers, params: {room_id: roomId}})
        console.log("GameboardApi.getLatestBoard response", response)
        return response

    }



}