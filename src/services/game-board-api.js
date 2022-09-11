import {ApiConfig} from "../config/api_config";
import {AuthenticationService} from "./authentication";
import axios from "axios";


export class GameBoardApi {

    createBoard = async (roomId, category, board_size, difficulty) => {
        const url = ApiConfig.WORSEARCH_BOARD_CREATE_URL
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
        console.log("GameBoardApi.createBoard response", response)
        return response

    }


    deleteGameBoard = async (boardId) => {
        const url = ApiConfig.WORSEARCH_BOARD_DELETE_URL.replace("{boardId}", boardId)
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.delete(url, {headers: headers})
        console.log("GameBoardApi.deleteGameBoard response", response)
        return response
    }


    getSubmissions = async (boardId) => {
        const url = ApiConfig.WORSEARCH_BOARD_SUBMISSIONS_URL.replace("{boardId}", boardId)
        const headers = await new AuthenticationService().getAuthHeaders()
        const response = await axios.get(url, {headers: headers})
        console.log("GameBoardApi.getSubmissions response", response)
        return response
    }

    makeSubmission = async (boardId, start_cell, end_cell, word) => {
        const url = ApiConfig.WORSEARCH_BOARD_MAKE_SUBMISSIONS_URL.replace("{boardId}", boardId)
        const headers = await new AuthenticationService().getAuthHeaders()
        const payload = {
            "word": word,
            "row1": start_cell.row, "column1": start_cell.column,
            "row2": end_cell.row, "column2": end_cell.column
        }
        const response = await axios.post(url, payload, {headers: headers})
        console.log("GameBoardApi.makeSubmission response", response)
        return response
    }
}