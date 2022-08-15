import React from 'react'
import GridService from '../../services/grid-service.js'
import {GameBoardApi} from "../../services/game-board-api";
import {CategoryApi} from "../../services/category-api";

import './create-game-board.css'

export default class CreateGameBoard extends React.Component {
    constructor(props) {
        super(props)

        this.room_id = this.props.room_id;
        this.set_board_data_callback = this.props.callback

        this.grid_service = new GridService()
        this.game_board_api = new GameBoardApi()
        this.category_api = new CategoryApi()


        this.state = {
            board_id: this.props.board_id || null,
            board_size: this.props.board_size || 2,
            difficulty_selected: this.props.difficulty_selected || false,
            difficulty: this.props.difficulty || 2,
            category_selected: this.props.category_selected || false,
            category: 'default',
        }
    }

    changeCategory = (event) => {
        this.setState({
            category: event.target.value
        })
    }

    changeBoardSize = (event) => {
        this.setState({
            board_size: event.target.value
        })
    }

    changeDifficulty = (event) => {
        this.setState({
            difficulty: event.target.value
        })
    }


    createBoard = async () => {
        if (this.props.board_id != null) return
        const response = await this.game_board_api.createBoard(
            this.props.room_id,
            'default',
            this.state.board_size,
            this.state.difficulty
        )
        const board_id = response.data.id
        const board_data = response.data.board_data
        const board_dictionary = response.data.board_dictionary
        this.set_board_data_callback(board_id, board_data, board_dictionary)
    }

    componentDidMount = () => {

    }


    render() {

        return (
            <div style={{padding: "10px"}}>
                Board Size: &nbsp;
                <input type={"number"} onChange={this.changeBoardSize} value={this.state.board_size}
                       style={{width: "60px"}}/>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={this.createBoard}> Create Board
                </button>
            </div>
        )
    }
}
