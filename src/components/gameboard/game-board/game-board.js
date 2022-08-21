import GameBoardCreateView from "../game-board-create-view/game-board-create-view";
import GameBoardView from "../game-board-view/game-board-view";
import React, {Component} from "react";
import {GameBoardApi} from "../../../services/game-board-api";
import {GameBoardDictionary} from "../game-board-dictionary/game-board-dictionary";
import {GameBoardLeaderboard} from "../game-board-leaderboard/game-board-leaderboard";
import {RoomApi} from "../../../services/room-api";


export class GameBoard extends Component {

    constructor(props) {
        super(props);
        this.gameboard_api = new GameBoardApi()
        this.room_api = new RoomApi()
        this.room_id = this.props.room_id

        this.state = {
            have_board: false,
            board_id: null,
            board_data: null,
            board_dictionary: null,
            board_submissions: []
        }
    }


    createBoard = async (category, board_size, difficulty) => {
        const response = await this.gameboard_api.createBoard(
            this.room_id,
            category,
            board_size,
            difficulty
        );
        this.setState({
            have_board: true,
            board_id: response.data.id,
            board_data: response.data.board_data,
            board_dictionary: response.data.board_dictionary
        })
    }

    deleteBoard = async () => {
        await this.gameboard_api.deleteGameBoard(this.state.board_id);
        this.setState({
            have_board: false,
            board_id: null,
            board_dictionary: null,
            board_data: null,
            board_submissions: []
        })
    }

    loadSubmissions = async (board_id) => {
        const board_submissions_response = await this.gameboard_api.getSubmissions(board_id)
        return board_submissions_response.data
    }

    getActiveBoardDetails = async () => {
        const board_info_response = await this.room_api.getLatestBoard(this.room_id)
        const board_id = board_info_response.data.id
        const board_data = board_info_response.data.board_data
        const board_dictionary = board_info_response.data.board_dictionary

        const board_submissions = await this.loadSubmissions(board_id)
        if (board_info_response.data.hasOwnProperty('board_data')) {
            this.setState({
                have_board: true,
                board_id: board_id,
                board_data: board_data,
                board_dictionary: board_dictionary,
                board_submissions: board_submissions
            })
        }

    }

    addSubmission = async (start_cell, end_cell, word) => {
        await this.gameboard_api.makeSubmission(this.state.board_id, start_cell, end_cell, word)
        const board_submissions = [...await this.loadSubmissions(this.state.board_id)]
        this.setState({board_submissions})
        console.log("updated the state")
    }


    componentDidMount = async () => {
        await this.getActiveBoardDetails()
    }


    render = () => {
        if (this.state.have_board) {
            return (
                <div className={"game-board-view"}>
                    <div className="canvas">
                        <GameBoardView
                            room_id={this.room_id}
                            board_id={this.state.board_id}
                            board_data={this.state.board_data}
                            board_dictionary={this.state.board_dictionary}
                            board_submissions={this.state.board_submissions}
                            submission_callback={this.addSubmission}
                        />
                    </div>
                    <div className="dictionary">
                        <GameBoardDictionary
                            board_dictionary={this.state.board_dictionary}
                            board_submissions={this.state.board_submissions}/>
                    </div>
                    <div className="submissions">
                        <GameBoardLeaderboard submissions={this.state.board_submissions}/>
                    </div>

                    <div className="placeholder">
                        <div onClick={this.deleteBoard}>
                            Close Game
                        </div>
                    </div>


                </div>
            )
        }
        return (
            <GameBoardCreateView room_id={this.room_id} create_board={this.createBoard}/>
        )
    }
}