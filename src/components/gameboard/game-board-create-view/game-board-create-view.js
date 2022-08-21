import React from 'react'
import {CategoryApi} from "../../../services/category-api";

import './game-board-create-view.css'

export default class GameBoardCreateView extends React.Component {
    constructor(props) {
        super(props)

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
        //TODO: needs to validation here
        this.props.create_board(
            this.state.category,
            this.state.board_size,
            this.state.difficulty
        )
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
