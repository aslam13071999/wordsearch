import React from 'react'
import GridService from '../../services/grid-service.js'
import './game-board.css'
import {GameBoardApi} from "../../services/game-board-api";
import {CategoryApi} from "../../services/category-api";

export default class GameBoard extends React.Component {
    constructor(props) {
        super(props)
        this.room_id = this.props.room_id;
        this.grid_service = new GridService()
        this.game_board_api = new GameBoardApi()
        this.category_api = new CategoryApi()

        this.cell_size = 16
        this.space_between = 20
        this.left_margin = 32
        this.top_margin = 32


        this.state = {
            board_created: false,
            board_size: 6,
            difficulty_selected: this.props.difficulty_selected || false,
            difficulty: this.props.difficulty || 2,
            category_selected: this.props.category_selected || false,
            category: 'default',
            board_data: null,
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


    createBoard = async () => {
        const response = await this.game_board_api.createBoard(
            this.props.room_id,
            'default',
            this.state.board_size,
            this.state.difficulty
        )
        this.setState({
            board_created: true
        })
        const response2 = await this.getCategories()
        console.log(response2)
    }

    getCategories = async () => {
        const response = await this.category_api.listCategories()
        console.log(response)
    }

    componentDidMount = () => {

    }


    draw() {
        const canvas = document.getElementById("text-panel")
        const grid_data = this.grid_service.grid_data.getData()
        const font = '2em sans'
        for (let i = 0; i < this.board_size; ++i) {
            for (let j = 0; j < this.board_size; ++j) {
                let x = this.left_margin + ((this.cell_size + this.space_between) * i);
                let y = this.top_margin + ((this.cell_size + this.space_between) * j);
                let ctx = canvas.getContext('2d')
                ctx.font = font
                ctx.fillText(grid_data[i][j], x, y)
            }
        }
    }

    render() {

        return (
            <div>
                {
                    this.state.board_created === false &&
                    <div style={{padding: "10px"}}>
                        Board Size: &nbsp;
                        <input type={"number"} onChange={this.changeBoardSize} value={this.state.board_size_x}
                               style={{width: "60px"}}/>
                        <button onClick={this.createBoard}> Create Board</button>
                    </div>
                }
                {
                    this.state.board_created !== true &&
                    <div>
                        <canvas width="1000px" height="1000px" id="text-panel"></canvas>
                    </div>
                }
            </div>
        )
    }
}
