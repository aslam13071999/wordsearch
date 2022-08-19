import {Component} from "react";
import './game-board-view.css'

export default class GameBoardView extends Component {

    constructor(props) {
        super(props);
        this.room_id = this.props.room_id
        this.board_id = this.props.board_id
        this.board_data = this.props.board_data
        this.delete_board = this.props.delete_board

        this.dictionary = []
        this.props.board_dictionary.map((dictionary_item) => {
            this.dictionary.push({'word': dictionary_item, 'solved': Math.random() > 0.5 ? true : false})
        })

        this.font_size = 12

        this.state = {
            board_size: 300
        }
    }



    draw = () => {
        const N = this.board_data.length

        const canvas = document.getElementById("canvas")

        // const font = '2em sans'
        // const fillStyle = "black"


        const cell_padding_factor = 1.5
        const cell_padding = this.font_size * cell_padding_factor
        const cell_size = 2 * cell_padding + this.font_size
        const offset = this.font_size * (2)

        const line_size = (N) * cell_size;
        const board_size = line_size + (2 * offset);

        canvas.width = board_size
        canvas.height = board_size


        // row lines
        for (let i = 0; i <= N; ++i) {
            let x1 = offset
            let x2 = line_size + offset
            let y = offset + (i * cell_size);
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();

            let y1 = offset
            let y2 = line_size + offset
            let x = offset + (i * cell_size);
            let ctx2 = canvas.getContext("2d");
            ctx2.beginPath();
            ctx2.moveTo(x, y1);
            ctx2.lineTo(x, y2);
            ctx2.stroke();
        }

        // for (let i = 0; i < N; ++i) {
        //     for (let j = 0; j < N; ++j) {
        //         let x = offset + ((this.font_size * factor) * i);
        //         let y = offset + ((this.font_size * factor) * j) + this.font_size;
        //         let ctx = canvas.getContext('2d')
        //         ctx.font = font
        //         ctx.fillStyle = fillStyle
        //         ctx.fillText(this.board_data[i][j], x, y)
        //     }
        // }
        this.setState({
            board_size: board_size
        })
    }

    componentDidMount() {
        this.draw()
    }


    render = () => {
        return (
            <div className={"game-board-view"}>
                <div className="canvas">
                    <canvas id="canvas">

                    </canvas>
                </div>
                <div className="dictionary">
                    {
                        this.dictionary.map((row) => {
                            return (
                                <div   key={row.word}
                                    className={`dictionary-item ${row.solved ? "solved": ""}` }>
                                    {row.word}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="submissions">
                    submissions
                </div>

                <div className="placeholder">
                    <div onClick={this.delete_board}>
                        Close Game
                    </div>
                </div>


            </div>
        )
    }
}

