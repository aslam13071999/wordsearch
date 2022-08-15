import {Component} from "react";
import CreateGameBoard from "../create-game-board/create-game-board";


export class GameBoardView extends Component {

    constructor(props) {
        super(props);
        this.room_id = this.props.room_id
        this.board_id = this.props.board_id
        this.board_data = this.props.board_data
        this.board_dictionary = this.props.board_dictionary

        this.cell_size = 16
        this.space_between = 20
        this.left_margin = 32
        this.top_margin = 32
    }


    draw = () => {
        const N = this.board_data.length
        const canvas = document.getElementById("canvas")
        const area = "" + this.left_margin + ((this.cell_size + this.space_between) * (N+1))
        console.log("required area", area, N)
        canvas.style.width = area
        canvas.style.height = area

        const font = '2em sans'
        for (let i = 0; i < N; ++i) {
            for (let j = 0; j < N; ++j) {
                let x = this.left_margin + ((this.cell_size + this.space_between) * i);
                let y = this.top_margin + ((this.cell_size + this.space_between) * j);
                let ctx = canvas.getContext('2d')
                ctx.font = font
                ctx.fillText(this.board_data[i][j], x, y)
            }
        }
    }

    componentDidMount() {
        this.draw()
    }


    render = () => {
        return (
            <div>
                <canvas id="canvas" ></canvas>

            </div>
        )
    }
}