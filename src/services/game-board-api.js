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


    deleteGameBoard = async (boardId) => {
        const url = ApiConfig.GAME_BOARD_DELETE_URL.replace("{boardId}", boardId)
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.delete(url, {headers: headers})
        console.log("GameboardApi.deleteGameboard response", response)
        return response
    }


}