import {Component} from "react";
import './game-board-view.css'
import {ColorGenerationService} from "../../../services/color-generation";
import colors from "tailwindcss/colors";


export default class GameBoardView extends Component {

    constructor(props) {
        super(props);
        this.roomId = this.props.room_id
        this.boardId = this.props.board_id
        this.boardData = this.props.board_data
        this.boardDictionary = this.props.board_dictionary
        this.boardSubmissions = this.props.board_submissions

        this.color_service = new ColorGenerationService()

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

        let ctx = this.board_canvas.getContext("2d");
        ctx.clearRect(0, 0, this.board_canvas.width, this.board_canvas.height);


    }

    drawGameBoard = () => {
        // reset the board
        this.board_canvas.width = this.boardSize
        this.board_canvas.height = this.boardSize

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
                x += (this.cellPadding)
                y += (this.cellPadding)
                ctx.beginPath();
                ctx.rect(x, y, this.state.fontSize, this.state.fontSize);
                ctx.stroke();

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

    setOverlayContext = () => {
        this.lineFactor = 0.7071067811865475 * this.cellSize
        let ctx = this.overlay_canvas.getContext('2d')
        ctx.clearRect(0, 0, this.board_canvas.width, this.board_canvas.height);
    }

    componentDidMount() {
        this.setBoardContext()
        this.drawGameBoard()
        this.setOverlayContext()
        this.drawSubmissions()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setBoardContext()
        this.drawGameBoard()
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

    getCenterPoint = (cell) => {
        const x = this.offset + ((cell.column) * this.cellSize) + (this.cellSize/2)
        const y = this.offset + ((cell.row) * this.cellSize)+ (this.cellSize/2)
        return {x, y}
    }

    drawLineBetweenPoints = (point1, point2, color) => {

        const slope = Math.atan((point2.y-point1.y)/(point2.x - point1.x))
        let X1 = point1.x + ((this.state.fontSize/2) * Math.sin(slope))
        let Y1 = point1.y - ((this.state.fontSize/2) * Math.cos(slope))

        const dist = Math.sqrt(Math.pow((point2.y - point1.y), 2) + Math.pow((point2.x - point1.x), 2) )

        let ctx = this.overlay_canvas.getContext("2d");
        ctx.translate(X1, Y1)
        ctx.rotate(slope)
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, dist, this.state.fontSize);
        ctx.resetTransform();

    }

    drawLineBetweenCells = (cell1, cell2, color) => {
        const point1 = this.getCenterPoint(cell1)
        const point2 = this.getCenterPoint(cell2)
        this.drawLineBetweenPoints(point1, point2, color)
    }

    drawSubmissions = () => {
        this.overlay_canvas.width = this.boardSize
        this.overlay_canvas.height = this.boardSize

        this.drawLineBetweenCells(
            {row: 2, column: 2},
            {row: 4, column: 4},
            "#f0f"
        )
        

        this.boardSubmissions.forEach((submission) => {
            this.drawLineBetweenCells(
                {
                    row: submission.submission_data['row1'],
                    column: submission.submission_data['column1']
                },
                {
                    row: submission.submission_data['row2'],
                    column: submission.submission_data['column2'],
                },
                this.color_service.getColorForUser(submission.submission_by.username)
            )
        })
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

