import {ApiConfig} from "../config/api_config";
import axios from "axios";


export class GameBoardApi {
    createBoard = async (roomId, category) => {
        const url = ApiConfig.API_URL + "/word-search/room/" + roomId + "/create_post/"
        const response = await axios.post(url, {'category': category})
        console.log("Gameboard.createboard response", response)
        return response
    }

    deleteBoard = async (roomId, boardId) => {

    }

    submitSolution = async () => {

    }

}