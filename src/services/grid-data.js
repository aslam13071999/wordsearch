

export class GridData {

    constructor(){
        this.grid_data = null
        this.dictionary = null
        this.solved = []
    }

    reset = () => {
        this.grid_data = null
        this.dictionary = null
        this.solved = []
    }

    generateData = (board_size) => { 
        // it should call api and get grid data and return
        let data = []
        let row_data = [];
        for( var j = 1; j <= board_size; j += 1){
            row_data.push('A');
        }
        for(var i=1; i<= board_size; i += 1){
            data.push(row_data)
        }
        this.grid_data = data;
        this.dictionary = []
    }

    getData = () => {
        return this.grid_data
    }

}