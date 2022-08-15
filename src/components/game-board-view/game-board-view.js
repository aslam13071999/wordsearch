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
            height: window.innerHeight
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

        const font = '1em sans'


        for (let i = 0; i < N; ++i) {
            for (let j = 0; j < N; ++j) {
                let x = (this.font_size * 2) + ((this.font_size * 2) * i);
                let y = (this.font_size * 2) + ((this.font_size * 2) * j);
                console.log("drawing", this.board_data[i][j], x, y)
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
            <div className="game-board">
                <canvas id="canvas" className={"canvas"} width="800px" height="800px">

                </canvas>
                <div className={"dictionary"}>
                    A
                </div>
                <div className={"placeholder"}>
                    B

                </div>

            </div>
        )
    }
}