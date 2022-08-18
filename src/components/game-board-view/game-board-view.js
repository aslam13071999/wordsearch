import {Component} from "react";
import './game-board-view.css'


export class GameBoardView extends Component {

    constructor(props) {
        super(props);
        this.room_id = this.props.room_id
        this.board_id = this.props.board_id
        this.board_data = this.props.board_data
        this.board_dictionary = this.props.board_dictionary

        this.font_size = 16

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            board_size: 300
        }
        window.addEventListener('resize', this.handleWindowSize)
    }

    handleWindowSize = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize)
    }

    draw = () => {
        const N = this.board_data.length

        const canvas = document.getElementById("canvas")

        const font = '2em sans'
        const fillStyle= "white"

        const factor = 3.5
        const board_size = (this.font_size * factor) * (N + 1);

        canvas.width = board_size
        canvas.height = board_size

        for (let i = 0; i < N; ++i) {
            for (let j = 0; j < N; ++j) {
                let x = (this.font_size * factor) + ((this.font_size * factor) * i);
                let y = (this.font_size * factor) + ((this.font_size * factor) * j);
                let ctx = canvas.getContext('2d')
                ctx.font = font
                ctx.fillStyle = fillStyle
                ctx.fillText(this.board_data[i][j], x, y)
            }
        }
        this.setState({
            board_size: board_size
        })
    }

    componentDidMount() {
        this.draw()
    }


    render = () => {
        return (
            <div className="game-board">
                <canvas id="canvas" className={"canvas"} >

                </canvas>
                <div className={"dictionary"}>
                    {
                        this.board_dictionary.map((board_word) => {
                            return (
                                <div key={board_word}>
                                    {board_word}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={"placeholder"}>
                    B
                </div>

            </div>
        )
    }
}