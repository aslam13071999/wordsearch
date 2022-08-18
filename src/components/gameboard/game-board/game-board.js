import GameBoardCreateView from "../game-board-create-view/game-board-create-view";
import GameBoardView from "../game-board-view/game-board-view";
import React, {Component} from "react";
import {GameBoardApi} from "../../../services/game-board-api";


export class GameBoard extends Component {

    constructor(props) {
        super(props);
        this.gameboard_api = new GameBoardApi()
        this.room_id = this.props.room_id
        this.state = {
            have_board: false,
            latest_board: null
        }
    }


    createBoard = async (category, board_size, difficulty) => {
        const response = await this.gameboard_api.createBoard(
            this.room_id,
            category,
            board_size,
            difficulty
        )
        this.setState({
            have_board: true,
            latest_board: response.data
        })
    }

    deleteBoard = async () => {
        await this.gameboard_api.deleteGameBoard(this.state.latest_board.id);
        this.setState({
            have_board: false,
            latest_board: null
        })
    }

    getActiveBoard = async () => {
        const response = await this.gameboard_api.getLatestBoard(this.room_id)
        console.log(response)
        if( response.data.hasOwnProperty('board_data')){
            this.setState({
                have_board: true,
                latest_board: response.data
            })
        }
    }

    componentDidMount = async () => {
        await this.getActiveBoard()
    }


    render = () => {
        return (
            <div>
                {
                    (this.state.have_board !== true) &&
                    <GameBoardCreateView room_id={this.room_id} create_board={this.createBoard}/>
                }
                {
                    (this.state.have_board === true) &&
                    <GameBoardView room_id={this.room_id}
                                   board_id={this.state.latest_board.id}
                                   board_data={this.state.latest_board.board_data}
                                   board_dictionary={this.state.latest_board.board_dictionary}
                                   delete_board={this.deleteBoard}

                    />
                }
            </div>
        )
    }
}