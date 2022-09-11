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

        this.state = {
            board_submissions: [],
            is_solved: false
        }

    }

    closeBoard = () => {
        console.log("GameBoard.closeBoard closing the board")
        this.props.on_close()
    }

    deleteBoard = async () => {
        console.log("GameBoard.deleteBoard deleting the board")
        await this.gameboard_api.deleteGameBoard(this.props.board_info.id);
        this.setState({
            board_submissions: [],
            is_solved: false
        })
        this.closeBoard()
    }

    loadSubmissions = async () => {
        console.log("GameBoard.loadSubmissions loading submissions")
        const board_submissions_response = await this.gameboard_api.getSubmissions(this.props.board_info.id)
        const board_submissions = board_submissions_response.data
        if (this.state.board_submissions.length !== board_submissions.length) {
            console.log("updated the state", board_submissions);
            this.setState({
                ...this.state,
                board_submissions: [
                    ...board_submissions
                ]
            })
        }
    }

    addSubmission = async (start_cell, end_cell, word) => {
        console.log("GameBoard.addSubmission adding submission")
        await this.gameboard_api.makeSubmission(this.props.board_info.id, start_cell, end_cell, word)
        await this.loadSubmissions()

    }


    componentDidMount = async () => {
        // refreshing submissions for every 5 seconds
        await this.loadSubmissions()
        this.realTimeSubmissionsFetchId = setInterval(this.loadSubmissions, 5000)

        // stop refreshing after 15 min.
        setTimeout(() => {
            clearInterval(this.realTimeSubmissionsFetchId)
        }, 1000 * 60 * 10)
    }

    componentWillUnmount() {
        clearInterval(this.realTimeSubmissionsFetchId)
    }


    render = () => {
        return (
            <div className={"grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 "}>
                <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 flex justify-center ">
                    <GameBoardView
                        board_data={this.props.board_info.board_data}
                        board_dictionary={this.props.board_info.board_dictionary}
                        board_submissions={this.state.board_submissions}
                        submission_callback={this.addSubmission}
                        post_solving_callback={this.closeBoard}
                        is_solved={this.state.is_solved}
                    />
                </div>
                <div className="col-span-1">
                    <GameBoardDictionary
                        board_dictionary={this.props.board_info.board_dictionary}
                        board_submissions={this.state.board_submissions}/>
                </div>
                <div className="col-span-1">
                    <GameBoardLeaderboard board_submissions={this.state.board_submissions}/>
                </div>

            </div>
        )

    }
}