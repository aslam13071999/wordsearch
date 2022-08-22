import {Component} from "react";
import './game-board-view.css'
import {ColorGenerationService} from "../../../services/color-generation";
import {AuthenticationService} from "../../../services/authentication";
import {GameBoardApi} from "../../../services/game-board-api";


export default class GameBoardView extends Component {

    constructor(props) {
        super(props);

        this.color_service = new ColorGenerationService()
        this.authentication_service = new AuthenticationService()
        this.game_board_api = new GameBoardApi()

        this.setAttributesFromProps(this.props)

        this.state = {
            fontSize: 32,
            fontFamily: "ubuntu",
            fontColor: "black",
            selectionMode: "drag", // drag, tap
            drawLines: true,
            is_solved: false
        }

        this.start_cell = null
        this.last_mouse_over_cell = null
    }

    setAttributesFromProps = () => {
        this.roomId = this.props.room_id
        this.boardId = this.props.board_id
        this.boardData = this.props.board_data
        this.boardDictionary = this.props.board_dictionary
        this.boardSubmissions = this.props.board_submissions
        this.addSubmission = this.props.submission_callback
    }

    changeFontSize = (e) => this.setState({fontSize: parseInt(e.target.value)})
    changeFontColor = (e) => this.setState({fontColor: e.target.value})
    changeFontFamily = (e) => this.setState({fontFamily: e.target.value})
    changeSelectionMode = (e) => this.setState({selectionMode: e.target.value})

    componentDidMount = () => {
        console.debug("GameBoardView.componentDidMount")
        this.setBoardContext()
        this.drawGameBoard()
        this.setSubmissionsOverlayContext()
        this.drawSubmissions(this.props.board_submissions)
        this.setDrawOverlayContext()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setAttributesFromProps()
        if (this.props.board_submissions.length != prevProps.board_submissions.length) {
            console.debug("GameBoardView.componentDidUpdate")
            this.setBoardContext()
            this.drawGameBoard()
            this.setSubmissionsOverlayContext()
            this.drawSubmissions()
            this.resetDrawOverlay()
            this.setDrawOverlayContext()
        }
    }


    setBoardContext = () => {
        console.debug("GameBoardView.setBoardContext")

        this.board_canvas = document.getElementById("boardData")

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

    drawGameBoard = () => {
        // reset the board
        console.debug("GameBoardView.drawGameBoard")
        this.board_canvas.width = this.boardSize
        this.board_canvas.height = this.boardSize

        let ctx = this.board_canvas.getContext("2d");

        if (this.state.drawLines) {
            // row lines
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
                // ctx.stroke();

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

    setSubmissionsOverlayContext = () => {
        console.debug("GameBoardView.setSubmissionsOverlayContext")
        this.submission_overlay = document.getElementById("submission_overlay")
        this.submission_overlay.width = this.boardSize
        this.submission_overlay.height = this.boardSize

    }

    setDrawOverlayContext = () => {
        console.debug("GameBoardView.setDrawOverlayContext")
        this.draw_overlay = document.getElementById("draw_overlay")
        this.draw_overlay.width = this.boardSize
        this.draw_overlay.height = this.boardSize
    }

    resetDrawOverlay = () => {
        console.debug("GameBoardView.resetDrawOverlay")
        this.draw_overlay.width = this.boardSize
    }

    drawLineBetweenPoints = (canvas, point1, point2, color) => {
        console.debug("GameBoardView.drawLineBetweenPoints")
        if (point2.x + this.cellSize - this.cellPadding <= point1.x) {
            let tmp = point1
            point1 = point2
            point2 = tmp;
        }

        let slope = Math.atan((point2.y - point1.y) / (point2.x - point1.x))
        let X1 = point1.x + ((this.state.fontSize / 2) * Math.sin(slope))
        let Y1 = point1.y - ((this.state.fontSize / 2) * Math.cos(slope))

        const dist = Math.sqrt(Math.pow((point2.y - point1.y), 2) + Math.pow((point2.x - point1.x), 2))
        const start = slope + (Math.PI / 2)
        const end = slope + (Math.PI * 1.5)

        let ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(point1.x, point1.y, (this.state.fontSize / 2), start, end);
        ctx.fill()

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(point2.x, point2.y, (this.state.fontSize / 2), start, end, true);
        ctx.fill()

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fill()
        ctx.translate(X1, Y1)
        ctx.rotate(slope)
        ctx.fillRect(0, 0, dist, this.state.fontSize);
        ctx.resetTransform();

    }

    drawLineBetweenCells = (canvas, cell1, cell2, color) => {
        console.debug("GameBoardView.drawLineBetweenCells")
        const point1 = this.getCenterPoint(cell1)
        const point2 = this.getCenterPoint(cell2)
        this.drawLineBetweenPoints(canvas, point1, point2, color)
    }

    drawSubmissions = () => {
        console.debug("GameBoardView.drawSubmissions")
        this.boardSubmissions.forEach((submission) => {
            this.drawLineBetweenCells(
                this.submission_overlay,
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

    getCenterPoint = (cell) => {
        const x = this.offset + ((cell.column) * this.cellSize) + (this.cellSize / 2)
        const y = this.offset + ((cell.row) * this.cellSize) + (this.cellSize / 2)
        return {x, y}
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

    getWordInSelection = (start_cell, end_cell) => {
        console.debug("GameBoardView.getWordInSelection")
        let row_offset = 0
        let column_offset = 0
        if (start_cell.row !== end_cell.row) {
            row_offset = start_cell.row < end_cell.row ? 1 : -1;
        }
        if (start_cell.column !== end_cell.column) {
            column_offset = start_cell.column < end_cell.column ? 1 : -1;
        }
        console.debug("offsets", row_offset, column_offset)
        const words_count_in_selection = Math.max(
            Math.abs(start_cell.row - end_cell.row),
            Math.abs(start_cell.column - end_cell.column)
        )
        console.debug("words_count_in_selection", words_count_in_selection)
        let chars_in_selection = []
        let cur_row = start_cell.row
        let cur_column = start_cell.column
        for (let i = 0; i <= words_count_in_selection; ++i) {
            chars_in_selection.push(this.boardData[cur_row][cur_column])
            cur_row += row_offset
            cur_column += column_offset
        }
        return chars_in_selection.join('')
    }

    isValidSelection = (start_cell, end_cell) => {
        console.debug("GameBoardView.isValidSelection")
        let is_same_row = start_cell.row === end_cell.row
        let is_same_column = start_cell.column === end_cell.column
        let is_diagonal = Math.abs(start_cell.row - start_cell.column) === Math.abs(end_cell.row - end_cell.column)
        let is_reverse_diagonal = (start_cell.row + start_cell.column) === (end_cell.row + end_cell.column)
        return is_same_column || is_same_row || is_diagonal || is_reverse_diagonal
    }

    isValidWord = (selected_word) => {
        console.debug("GameBoardView.isValidWord")
        let is_word_in_dictionary = false;
        for (let i = 0; i < this.boardDictionary.length; ++i) {
            if (this.boardDictionary[i] === selected_word) is_word_in_dictionary = true;
        }
        return is_word_in_dictionary === true
    }


    onCanvasMouseUp = async (e) => {
        console.debug("GameBoardView.onCanvasMouseUp", e)
        let current_cell = this.getEventCell(e)
        console.debug("GameBoardView.onCanvasMouseUp event triggered at ", current_cell)

        this.resetDrawOverlay()

        const start_cell = this.start_cell
        this.start_cell = null
        this.last_mouse_over_cell = null

        const selected_word = this.getWordInSelection(start_cell, current_cell)

        console.debug("validating the selection", start_cell, current_cell)
        if (this.isValidSelection(start_cell, current_cell) === false) {
            console.debug("invalid selection area", start_cell, current_cell)
            return
        }
        if (this.isValidWord(selected_word) === false) {
            console.debug("Invalid word", selected_word)
            return
        }

        // this.drawLineBetweenCells(this.submission_overlay, start_cell, current_cell, this.color_service.get_random())
        await this.addSubmission(start_cell, current_cell, selected_word)

    }

    onCanvasMouseDown = (e) => {
        console.debug("GameBoardView.onCanvasMouseDown", e)
        let current_cell = this.getEventCell(e)
        console.debug("GameBoardView.onCanvasMouseDown event triggered at ", current_cell)
        this.start_cell = current_cell
    }

    compareEqual = (cell1, cell2) => {
        if (cell1 == null) return false
        if (cell2 == null) return false
        if (cell1.row !== cell2.row) return false
        return cell1.column === cell2.column;

    }

    onMouseOver = (e) => {
        if (this.start_cell == null) return;
        if (this.state.selectionMode !== "drag") return;
        console.debug("GameBoardView.onMouseOver", e)
        let current_cell = this.getEventCell(e)
        console.debug("GameBoardView.onMouseOver event triggered at ", current_cell)
        if (this.compareEqual(current_cell, this.start_cell)) return;
        if (this.compareEqual(this.last_mouse_over_cell, current_cell)) return;
        this.resetDrawOverlay()
        this.drawLineBetweenCells(
            this.draw_overlay,
            this.start_cell, current_cell,
            this.color_service.getColorForUser("asif"))
        this.last_mouse_over_cell = current_cell
    }

    checkBoardSolved = () => {
        console.debug("GameBoardView.checkBoardSolved")
        if(this.boardSubmissions === this.boardDictionary.length){
            console.info("board is solved")
            return true;
        }
        return false
    }

    render = () => {
        console.debug("GameBoardView.render")
        return (
            <div>

                <div style={{marginTop: "40px"}}>
                    Font Size: <input type={"number"} onChange={this.changeFontSize} value={this.state.fontSize}/>
                    Font Color: <input type={"text"} onChange={this.changeFillColor} value={this.state.fillColor}/>
                    Font Family: <input type={"text"} onChange={this.changeFontFamily} value={this.state.fontFamily}/>
                    <button onClick={this.draw}> Redraw</button>
                </div>
                <div className={"canvas-elements"}>
                    <canvas id="draw_overlay" className={"canvas-overlay"}

                    >
                    </canvas>
                    <canvas id="submission_overlay" className={"canvas-overlay"}
                            onMouseDown={this.onCanvasMouseDown}
                            onMouseUp={this.onCanvasMouseUp}
                            onMouseMove={this.onMouseOver}>
                    </canvas>
                    <canvas id="boardData">
                    </canvas>
                </div>
            </div>
        )
    }
}

