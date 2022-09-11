export class ApiConfig {
    static BE_API_URL = "https://wordsearch-mp.web.app"
    static FE_API_URL = "https://wordsearch-mp.web.app"

    static CATEGORIES_LIST_URL = ApiConfig.BE_API_URL + "/wordsearch/category/"

    static WORSEARCH_BOARD_CREATE_URL = ApiConfig.BE_API_URL + "/wordsearch/board/"
    static WORSEARCH_BOARD_DELETE_URL = ApiConfig.BE_API_URL + "/wordsearch/board/{boardId}"
    static WORSEARCH_BOARD_SUBMISSIONS_URL = ApiConfig.BE_API_URL + "/wordsearch/board/{boardId}/submissions/"
    static WORSEARCH_BOARD_MAKE_SUBMISSIONS_URL = ApiConfig.BE_API_URL + "/wordsearch/board/{boardId}/make_submission/"

    static ROOM_CREATE_URL = ApiConfig.BE_API_URL + "/rooms/"
    static ROOM_JOIN_URL = ApiConfig.BE_API_URL + "/rooms/{roomId}/join/"
    static ROOM_DELETE_URL = ApiConfig.BE_API_URL + "/rooms/{roomId}/"
    static ROOM_JOINED_USERS_URL = ApiConfig.BE_API_URL + "/rooms/{roomId}/joined_players/"
    static ROOM_INFO_URL = ApiConfig.BE_API_URL + "/rooms/{roomId}/"
    static ROOM_LIST_URL = ApiConfig.BE_API_URL + "/rooms/"
    static ROOM_LATEST_BOARD_URL = ApiConfig.BE_API_URL + "/rooms/{roomId}/latest_board/"

    static USER_PROFILE_URL = ApiConfig.BE_API_URL + "/users/profile";


}