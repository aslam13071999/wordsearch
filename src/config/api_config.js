
export class ApiConfig{
    static API_URL = "http://localhost:8000"
    static ROOM_CREATE_URL = ApiConfig.API_URL + "/word-search/room/"
    static ROOM_JOIN_URL = ApiConfig.API_URL + "/word-search/room/{roomId}/join/"
    static ROOM_DELETE_URL = ApiConfig.API_URL + "/word-search/room/{roomId}/"
    static ROOM_INFO_URL = ApiConfig.API_URL + "/word-search/room/{roomId}/"
    static GAME_BOARD_CREATE_URL = ApiConfig.API_URL + "/word-search/gameboard/"
    static CATEGORIES_LIST_URL = ApiConfig.API_URL + "/word-search/category/"
    static ROOM_JOINED_USERS_URL = ApiConfig.API_URL + "/word-search/room/{roomId}/joined_players/"

}