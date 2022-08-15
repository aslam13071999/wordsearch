
export class ApiConfig{
    static API_URL = "http://localhost:8000"
    static ROOM_CREATE_URL = ApiConfig.API_URL + "/word-search/room/"
    static ROOM_JOIN_URL = ApiConfig.API_URL + "/word-search/room/{0}/join/"
    static ROOM_DELETE_URL = ApiConfig.API_URL + "/word-search/room/{0}/"
    static ROOM_INFO_URL = ApiConfig.API_URL + "/word-search/room/{0}/"
    static GAME_BOARD_CREATE_URL = ApiConfig.API_URL + "/word-search/gameboard/"
}