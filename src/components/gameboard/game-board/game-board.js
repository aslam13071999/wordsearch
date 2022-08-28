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
            board_submissions: [],
            is_solved: false
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
            board_dictionary: response.data.board_dictionary,
            is_solved: response.data.is_solved
        })
    }

    deleteBoard = async () => {
        await this.gameboard_api.deleteGameBoard(this.state.board_id);
        this.setState({
            have_board: false,
            board_id: null,
            board_dictionary: null,
            board_data: null,
            board_submissions: [],
            is_solved: false
        })
    }

    loadSubmissions = async (board_id) => {
        const board_submissions_response = await this.gameboard_api.getSubmissions(board_id)
        return board_submissions_response.data
    }

    getActiveBoardDetails = async () => {
        const board_info_response = await this.room_api.getLatestBoard(this.room_id)
        const board_id = board_info_response.data.id

        const board_submissions = await this.loadSubmissions(board_id)

        if (board_info_response.data.hasOwnProperty('board_data')) {
            this.setState({
                have_board: true,
                board_id: board_id,
                board_data: board_info_response.data.board_data,
                board_dictionary: board_info_response.data.board_dictionary,
                board_submissions: board_submissions,
                is_solved: board_info_response.data.is_solved
            })
        }
    }

    addSubmission = async (start_cell, end_cell, word) => {
        await this.gameboard_api.makeSubmission(this.state.board_id, start_cell, end_cell, word)
        const board_submissions = [...await this.loadSubmissions(this.state.board_id)];
        console.log("updated the state", board_submissions);
        this.setState({
            ...this.state,
            board_submissions: [
                ...board_submissions
            ]
        })
    }


    postSolveCallback = () => {
        this.setState({
            have_board: false,
            board_id: null,
            board_dictionary: null,
            board_data: null,
            board_submissions: [],
            is_solved: false
        })
    }

    componentDidMount = async () => {
        await this.getActiveBoardDetails()
    }


    render = () => {
        console.log("render", this.state);
        if (this.state.have_board) {
            return (
                <div className={"grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 "}>
                    <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 flex justify-center ">
                        <GameBoardView
                            board_data={this.state.board_data}
                            board_dictionary={this.state.board_dictionary}
                            board_submissions={this.state.board_submissions}
                            submission_callback={this.addSubmission}
                            post_solving_callback={this.postSolveCallback}
                            is_solved={this.state.is_solved}
                        />
                    </div>
                    <div className="col-span-1">
                        <GameBoardDictionary
                            board_dictionary={this.state.board_dictionary}
                            board_submissions={this.state.board_submissions}/>
                    </div>
                    <div className="col-span-1">
                        <GameBoardLeaderboard board_submissions={this.state.board_submissions}/>
                    </div>



                </div>
            )
        }
        return (
            <GameBoardCreateView room_id={this.room_id} create_board={this.createBoard}/>
        )
    }
}