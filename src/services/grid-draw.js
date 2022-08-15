


export class GridDraw {

    isDrawable = (start_at, end_at) => {
        if(start_at.row === end_at.row) return true;
        if(start_at.column === end_at.column) return true;
        if(Math.abs(start_at.row-start_at.column) === Math.abs(end_at.row-end_at.column)) return true;
        return false;
    }


    drawMarker = (start_at, end_at) => {
        console.log("drawing", start_at, end_at)
    }

    drawMarkers = (markers) => {
        markers.forEach(element => {
            this.drawMarker(element.start_at, element.end_at)
        });
    }

    reset = () => {

    }
}