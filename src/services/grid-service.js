import { GridData } from "./grid-data";
import { GridDraw } from "./grid-draw";

const MouseEvent = Object.freeze({
    MOUSE_UP: Symbol("MOUSE_UP"),
    MOUSE_DOWN: Symbol("MOUSE_DOWN"),
    MOUSE_OVER: Symbol("MOUSE_OVER")
});


export default class GridService {
    constructor() {
        this.grid_data = new GridData()
        this.grid_draw = new GridDraw()
        this.last_event = null
        this.clicked_at = null
    }

    check_if_this_event_is_same_as_last = (row, column, event) => {
        if (this.last_event !== null) {
            if (this.last_event.event === event){
                if(this.last_event.row === row && this.last_event.column === column){
                    return true
                }
            }
        }
        return false
    }

    add_event = (row, column, event) => {
        this.last_event = {
            event: event,
            row: row,
            column: column
        }
    }



    on_mouse_down = (row, column) => {
        if(this.check_if_this_event_is_same_as_last(row, column, MouseEvent.MOUSE_DOWN)) return 
        console.log("Recieved MOUSE_DOWN at row: " + row + " column: " + column )
        this.clicked_at = { row: row, column: column }
        this.add_event(row, column, MouseEvent.MOUSE_DOWN)        
    }

    on_mouse_up = (row, column)  => {
        if(this.check_if_this_event_is_same_as_last(row, column, MouseEvent.MOUSE_UP)) return
        console.log("Recieved MOUSE_UP at row: " + row + " column: " + column )
        const end_at ={row: row, column: column}
        if(this.grid_draw.isDrawable(this.clicked_at, end_at)){
            if(this.grid_data.validate(this.clicked_at, end_at)){
                this.grid_draw.reset()
                this.grid_data.addSolvedEntry(this.clicked_at, end_at)
                this.grid_draw.drawMarkers(this.grid_data.getSolvedEntries())
            }    
        }
        this.clicked_at = null
        this.add_event(row, column, MouseEvent.MOUSE_UP)
    }

    on_mouse_over = (row, column) => {
        if(this.check_if_this_event_is_same_as_last(row, column, MouseEvent.MOUSE_OVER)) return 
        if(this.clicked_at == null) return 
        console.log("Recieved MOUSE_OVER at row: " + row + " column: " + column )
        const current ={row: row, column: column}
        if(this.grid_draw.isDrawable(this.clicked_at, current)){
            this.grid_draw.reset()
            this.grid_draw.drawMarkers(this.grid_data.getSolvedEntries())
            this.grid_draw.drawMarker(this.clicked_at, current)
        }

        this.add_event(row, column, MouseEvent.MOUSE_OVER)
    }



}