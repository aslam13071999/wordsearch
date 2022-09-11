import GameBoardCreateView from "../game-board-create-view/game-board-create-view";
import GameBoardView from "../game-board-view/game-board-view";
import React, {Component} from "react";
import {GameBoardApi} from "../../../services/game-board-api";
import {GameBoardDictionary} from "../game-board-dictionary/game-board-dictionary";
import {GameBoardLeaderboard} from "../game-board-leaderboard/game-board-leaderboard";


export class GameBoard extends Component {

    constructor(props) {
        super(props);

        this.gameboard_api = new GameBoardApi()
        this.room_id = this.props.room_id
        this.board_id = this.props.board_info.id
        this.board_data = this.props.board_data
        this.board_dictionary = this.props.board_dictionary

        this.state = {
            board_submissions: [],
            is_solved: false
        }

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



    refreshSubmissionsRealtime = () => {
        const board_submissions = [... this.loadSubmissions(this.state.board_id)];
        console.log("updated the state", board_submissions);
        this.setState({
            ...this.state,
            board_submissions: [
                ...board_submissions
            ]
        })
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
        this.realTimeSubmissionsFetchId = setInterval(this.refreshSubmissionsRealtime, 5000)
        setTimeout(() => {
            clearInterval(this.realTimeSubmissionsFetchId)
        }, 1000 * 60 * 10) // clears after 15min
    }

    componentWillUnmount() {
        clearInterval(this.realTimeSubmissionsFetchId)
    }


    render = () => {
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

    }
}