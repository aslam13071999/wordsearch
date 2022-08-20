export class ApiConfig {
    static API_URL = "http://localhost:8000"
    static API_PREFIX = "/word-search"

    static CATEGORIES_LIST_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/category/"
    static CATEGORIES_VIEW_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/category/{category}/"

    static GAME_BOARD_CREATE_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/gameboard/"
    static GAME_BOARD_DELETE_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/gameboard/{boardId}";
    static GAME_BOARD_SUBMISSIONS_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/gameboard/{boardId}/submissions/"

    static ROOM_CREATE_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/room/"
    static ROOM_JOIN_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/room/{roomId}/join/"
    static ROOM_DELETE_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/room/{roomId}/"
    static ROOM_INFO_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/room/{roomId}/"
    static ROOM_JOINED_USERS_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/room/{roomId}/joined_players/"
    static ROOM_LIST_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/room/"
    static ROOM_LATEST_BOARD_URL = ApiConfig.API_URL + ApiConfig.API_PREFIX + "/room/{roomId}/latest_board/"


}