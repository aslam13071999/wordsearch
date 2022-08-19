import {Component} from "react";
import './game-board-view.css'
import {GameBoardSubmissions} from "../game-board-submissions/game-board-submissions";
import {GameBoardDictionary} from "../game-board-dictionary/game-board-dictionary";


export default class GameBoardView extends Component {

    constructor(props) {
        super(props);
        this.room_id = this.props.room_id
        this.board_id = this.props.board_id
        this.board_data = this.props.board_data
        this.delete_board = this.props.delete_board
        this.board_dictionary= this.props.board_dictionary


        this.fonts_available = ["sans", "serif", "roboto"]

        this.state = {
            board_size: 300,
            fontSize: 30,
            fontFamily: "serif",
            fillColor: "black"
        }
    }

    changeFontSize = (e) => {
        this.setState({
            fontSize: e.target.value
        })
    }
    changeFillColor = (e) => {
        this.setState({
            fillColor: e.target.value
        })
    }
    changeFontFamily = (e) => {
        this.setState({
            fontFamily: e.target.value
        })
    }

    draw = () => {
        const N = this.board_data.length
        const font_size = this.state.fontSize
        const fontFamily = this.state.fontFamily
        const fillColor = this.state.fillColor
        const font = font_size + "px " + fontFamily
        console.log(font)
        const canvas = document.getElementById("canvas")


        const cell_padding_factor = 0.4
        const offset_factor = 1.5
        const font_scaling = 1.2
        const cell_padding = font_size * cell_padding_factor
        const cell_size = 2 * cell_padding + font_size
        const offset = font_size * (offset_factor)

        const line_size = (N) * cell_size;
        const board_size = line_size + (2 * offset);

        canvas.width = board_size
        canvas.height = board_size


        for (let i = 0; i <= N; ++i) {
            // row lines
            let x1 = offset
            let x2 = line_size + offset
            let y = offset + (i * cell_size);
            let ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.fillStyle = fillColor
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();

            // column lines
            let y1 = offset
            let y2 = line_size + offset
            let x = offset + (i * cell_size);
            let ctx2 = canvas.getContext("2d");
            ctx2.beginPath();
            ctx2.fillStyle = fillColor
            ctx2.moveTo(x, y1);
            ctx2.lineTo(x, y2);
            ctx2.stroke();
        }


        for(let i=0; i<N; ++i){
            for(let j=0; j<N; ++j){
                let x = offset + (j * cell_size);
                let y = offset + (i * cell_size);
                x += (cell_padding)
                y += (cell_padding)
                let ctx = canvas.getContext('2d')
                ctx.beginPath();
                ctx.rect(x, y, font_size, font_size);
                // ctx.stroke();


                x = offset + (j * cell_size);
                y = offset + (i * cell_size);
                x += (cell_size/2)
                y += (cell_size/2)

                ctx.font = font
                ctx.fillStyle = fillColor
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(this.board_data[i][j], x, y)
            }
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
                    <GameBoardDictionary board_dictionary={this.board_dictionary} solved_words={[]} />
                </div>
                <div className="submissions">
                    <GameBoardSubmissions submissions={[]} />
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

