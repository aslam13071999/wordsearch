import {ApiConfig} from "../config/api_config";
import {AuthenticationService} from "./authentication";
import axios from "axios";


export class GameBoardApi{

    createBoard = async (roomId, category, board_size) => {
        const url = ApiConfig.GAME_BOARD_CREATE_URL
        const access_token = await new AuthenticationService().getAccessToken()
        const headers = {'Authorization': "Bearer " + access_token }
        const response = await axios.post(url,
            {
                "room_id": roomId,
                category,
                board_size
            },
            {headers: headers}
        )
        console.log("GameboardApi.createBoard response", response)
        return response

    }



}