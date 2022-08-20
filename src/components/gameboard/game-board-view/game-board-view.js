import {Component} from "react";
import './game-board-view.css'


export default class GameBoardView extends Component {

    constructor(props) {
        super(props);
        this.roomId = this.props.room_id
        this.boardId = this.props.board_id
        this.boardData = this.props.board_data
        this.boardDictionary = this.props.board_dictionary

        this.state = {
            fontSize: 32,
            fontFamily: "ubuntu",
            fontColor: "black",
            selectionMode: "drag", // drag, tap
            drawLines: true
        }


    }

    changeFontSize = (e) => this.setState({fontSize: parseInt(e.target.value)})
    changeFontColor = (e) => this.setState({fontColor: e.target.value})
    changeFontFamily = (e) => this.setState({fontFamily: e.target.value})
    changeSelectionMode = (e) => this.setState({selectionMode: e.target.value})

    setBoardContext = () => {

        this.board_canvas = document.getElementById("boardData")
        this.overlay_canvas = document.getElementById("overlay")

        this.paddingFactor = 0.4
        this.offsetFactor = 1.5

        this.cellPadding = this.state.fontSize * this.paddingFactor
        this.cellSize = (this.cellPadding * 2) + this.state.fontSize
        this.offset = this.state.fontSize * this.offsetFactor

        this.N = this.boardData.length
        this.font = this.state.fontSize + "px " + this.state.fontFamily

        this.lineSize = this.N * this.cellSize
        this.boardSize = this.lineSize + (2 * this.offset);

    }

    draw = () => {
        // reset the board
        this.board_canvas.width = this.boardSize
        this.board_canvas.height = this.boardSize
        this.overlay_canvas.width = this.boardSize
        this.overlay_canvas.height = this.boardSize

        let ctx = this.board_canvas.getContext("2d");
        // row lines
        if (this.state.drawLines) {
            for (let i = 0; i <= this.N; ++i) {
                let x1 = this.offset
                let x2 = this.lineSize + this.offset
                let y = this.offset + (i * this.cellSize);
                ctx.beginPath();
                ctx.fillStyle = this.state.fontColor
                ctx.moveTo(x1, y);
                ctx.lineTo(x2, y);
                ctx.stroke();
            }
            // column lines
            for (let i = 0; i <= this.N; ++i) {
                let y1 = this.offset
                let y2 = this.lineSize + this.offset
                let x = this.offset + (i * this.cellSize);
                ctx.beginPath();
                ctx.fillStyle = this.state.fontColor
                ctx.moveTo(x, y1);
                ctx.lineTo(x, y2);
                ctx.stroke();
            }
        }
        // board contents
        for (let i = 0; i < this.N; ++i) {
            for (let j = 0; j < this.N; ++j) {
                let x = this.offset + (j * this.cellSize);
                let y = this.offset + (i * this.cellSize);
                x += (this.cellSize)
                y += (this.cellSize)
                ctx.beginPath();
                ctx.rect(x, y, this.state.fontSize, this.state.fontSize);
                //ctx.stroke();

                x = this.offset + (j * this.cellSize);
                y = this.offset + (i * this.cellSize);
                x += (this.cellSize / 2)
                y += (this.cellSize / 2)

                ctx.font = this.font
                ctx.fillStyle = this.state.fontColor
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(this.boardData[i][j], x, y)
            }
        }

    }

    componentDidMount() {
        this.setBoardContext()
        this.draw()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setBoardContext()
        this.draw()
    }

    getEventPosition = (e) => {
        const rect = this.board_canvas.getBoundingClientRect()
        const elementRelativeX = e.clientX - rect.left;
        const elementRelativeY = e.clientY - rect.top;
        const x = elementRelativeX * this.board_canvas.width / rect.width;
        const y = elementRelativeY * this.board_canvas.height / rect.height;
        return {x, y}
    }

    getEventCell = (e) => {
        let point = this.getEventPosition(e)
        point.x -= this.offset
        point.y -= this.offset
        return {
            column: Math.floor(point.x / this.cellSize),
            row: Math.floor(point.y / this.cellSize)
        }
    }

    onCanvasMouseUp = (e) => {
        console.log("mouseup", e)
        let point = this.getEventCell(e)
        console.log("event happened at ", point)
    }
    onCanvasMouseDown = (e) => {
        console.log("mousedown", e)
        let point = this.getEventCell(e)
        console.log("event happened at ", point)
    }

    render = () => {
        return (
            <div>

                {/*<div style={{marginTop: "40px"}}>*/}
                {/*    Font Size: <input type={"number"} onChange={this.changeFontSize} value={this.state.fontSize} />*/}
                {/*    Font Color: <input type={"text"} onChange={this.changeFillColor} value={this.state.fillColor} />*/}
                {/*    Font Family: <input type={"text"} onChange={this.changeFontFamily} value={this.state.fontFamily} />*/}
                {/*    <button onClick={this.draw}> Redraw </button>*/}
                {/*</div>*/}
                <div className={"canvas-elements"}>
                    <canvas id="boardData" onMouseDown={this.onCanvasMouseDown} onMouseUp={this.onCanvasMouseUp}>
                    </canvas>
                    <canvas id="overlay" className={"canvas-overlay"}>
                    </canvas>
                </div>
            </div>
        )
    }
}

