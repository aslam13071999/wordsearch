import {Component} from "react";
import './game-board-view.css'
import {themeService} from "../../../services/theme";
import {themeChangeEventSubscriber} from "../../../services/subscriber";


export default class GameBoardView extends Component {

    constructor(props) {
        super(props);

        this.color_service = new themeService()
        new themeChangeEventSubscriber().addSubscriber(this.updateThemeState)

        this.setAttributesFromProps(this.props)

        this.state = {
            fontSize: 32,
            fontFamily: "ubuntu",
            fontColor: this.color_service.getFGColor(),
            selectionMode: "drag", // drag, tap
            drawLines: true,
            isSolved: this.props.is_solved,
            windowWidth: 0,
            windowHeight: 0,
            isDrawable: false
        }

        this.start_cell = null
        this.last_mouse_over_cell = null
        this.paddingFactor = 0.4
        this.offsetFactor = 1

    }

    setAttributesFromProps = () => {
        this.boardData = this.props.board_data
        this.boardDictionary = this.props.board_dictionary
        this.boardSubmissions = this.props.board_submissions
        this.addSubmission = this.props.submission_callback
        this.postSolveCallback = this.props.post_solving_callback
    }


    updateFontSize = (size) => {
        this.setState({
            ...this.state,
            fontSize: size
        })
    }

    updateFontColor = (color) => {
        this.setState({
            ...this.state,
            fontColor: color
        })
    }

    updateFontFamily = (family) => {
        this.setState({
            ...this.state,
            fontFamily: family
        })
    }
    updateSelectionMode = (mode) => {
        this.setState({
            ...this.state,
            selectionMode: mode
        })
    }


    changeFontSize = (e) => this.updateFontSize(parseInt(e.target.value))
    changeFontColor = (e) => this.updateFontColor(e.target.value)
    changeFontFamily = (e) => this.updateFontFamily(e.target.value)
    changeSelectionMode = (e) => this.updateSelectionMode(e.target.value)

    componentDidMount = () => {
        console.debug("GameBoardView.componentDidMount")
        if (!this.state.isSolved) {
            if (this.state.isDrawable) {
                this.drawEverything()
            }
            this.updateWindowDimensions();
            window.addEventListener('resize', this.updateWindowDimensions);
        }
    }

    updateWindowDimensions = () => {
        const fontSize = this.calculateOptimumFontSize(window.innerWidth, window.innerHeight)
        this.setState({
            ...this.state,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            selectionMode: (window.innerWidth <= 1024 ? "tap" : "drag"),
            fontSize: fontSize,
            isDrawable: fontSize !== -1
        });
    }

    calculateOptimumFontSize = (width, height) => {
        const N = this.boardData.length
        for (let currentFontSize = 40; currentFontSize >= 16; --currentFontSize) {
            const cellPadding = currentFontSize * this.paddingFactor
            const cellSize = (cellPadding * 2) + currentFontSize
            const offset = currentFontSize * this.offsetFactor
            const fullLineSize = (N * cellSize) + (offset * 2)
            if (fullLineSize < width && fullLineSize < height) {
                return currentFontSize
            }
        }
        return -1
    }

    updateThemeState = (bgColor, textColor) => {
        console.log(" GameboardView.updateThemeState updating the Theme state")
        this.setState({
            ...this.state,
            fontColor: textColor
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setAttributesFromProps()
        if (this.props.board_submissions.length !== prevProps.board_submissions.length) {
            console.debug("GameBoardView.componentDidUpdate due to change in submissions")
            if (!this.state.isSolved) {
                this.drawEverything()
                this.updateBoardSolved()
            }
        }
        if (this.state.fontColor !== prevState.fontColor) {
            console.debug("GameBoardView.componentDidUpdate due to change in color")
            this.drawEverything()
        } else if (this.state.fontFamily !== prevState.fontFamily) {
            console.debug("GameBoardView.componentDidUpdate due to change in font family")
            this.drawEverything()
        } else if (this.state.fontSize !== prevState.fontSize) {
            console.debug("GameBoardView.componentDidUpdate due to change in font size")
            this.drawEverything()
        } else if (this.state.isDrawable !== prevState.isDrawable) {
            console.debug("GameBoardView.componentDidUpdate due to isDrawable")
            this.drawEverything()
        } else if (this.state.selectionMode !== prevState.selectionMode) {
            console.debug("GameBoardView.componentDidUpdate due to selection mode")
            this.drawEverything()
        }
    }

    drawEverything = () => {
        console.debug("GameBoardView.componentDidMount")
        this.setBoardContext()
        this.setSubmissionsOverlayContext()
        this.setDrawOverlayContext()
        this.resetDrawOverlay()
        this.drawGameBoard()
        this.drawSubmissions()
    }


    setBoardContext = () => {
        console.debug("GameBoardView.setBoardContext")

        this.board_canvas = document.getElementById("boardData")


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
        ctx.fillStyle = this.state.fontColor
        ctx.strokeStyle = this.state.fontColor
        console.log("drawing lines with ", this.state.fontColor)
        if (this.state.drawLines) {
            // row lines
            for (let i = 0; i <= this.N; ++i) {
                let x1 = this.offset
                let x2 = this.lineSize + this.offset
                let y = this.offset + (i * this.cellSize);
                ctx.beginPath();
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

    highlightCell = (cell, color, canvas) => {
        const x = this.offset + ((cell.column) * this.cellSize) + (this.cellSize / 2)
        const y = this.offset + ((cell.row) * this.cellSize) + (this.cellSize / 2)
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, (this.state.fontSize * 0.6), 0, 2 * Math.PI, true);
        ctx.fill()

        // ctx.beginPath();
        // ctx.translate(x, y)
        // ctx.fillRect(0, 0, this.cellSize, this.cellSize);
        // ctx.resetTransform();

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

        if (this.state.selectionMode !== "drag") {
            if (this.start_cell == null) {
                this.start_cell = current_cell
                this.highlightCell(current_cell, this.color_service.getColorForUser("asif"), this.draw_overlay)
                return
            }
        }
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
        await this.addSubmission(start_cell, current_cell, selected_word)

    }

    onCanvasMouseDown = (e) => {
        console.debug("GameBoardView.onCanvasMouseDown", e)
        let current_cell = this.getEventCell(e)
        console.debug("GameBoardView.onCanvasMouseDown event triggered at ", current_cell)
        if (this.state.selectionMode === "drag") {
            this.start_cell = current_cell
        }
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

    updateBoardSolved = () => {
        console.debug("GameBoardView.checkBoardSolved")
        if (this.boardSubmissions.length === this.boardDictionary.length) {
            this.setState({
                ...this.state,
                isSolved: true
            })
            console.info("board is solved")
        }
    }

    closeBoard = () => {
        this.postSolveCallback()
    }

    render = () => {
        console.debug("GameBoardView.render")
        if (this.state.isSolved) {
            return this.render_solved()
        } else {
            return this.render_unsolved()
        }
    }

    render_unsolved = () => {
        console.debug("GameBoardView.render_unsolved")
        if (this.state.isDrawable) {
            return (
                <div>

                    {/*<div style={{marginTop: "40px"}}>*/}
                    {/*    Font Size: <input type={"number"} onChange={this.changeFontSize} value={this.state.fontSize}/>*/}
                    {/*    Font Color: <input type={"text"} onChange={this.changeFontColor} value={this.state.fontColor}/>*/}
                    {/*    Font Family: <input type={"text"} onChange={this.changeFontFamily} value={this.state.fontFamily}/>*/}
                    {/*    <button onClick={this.drawGameBoard}> Redraw</button>*/}
                    {/*</div>*/}
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
        } else {
            return (
                <div> Device width/height is too small to display the board</div>
            )
        }
    }

    render_solved = () => {
        console.debug("GameBoardView.render_solved")
        return (
            <div onClick={this.closeBoard} style={{padding: "100px"}}>
                Board is solved bro, you can close board by clicking here
            </div>
        )
    }

}

