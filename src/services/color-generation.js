export class ColorGenerationService {

    constructor() { // making single instantiation for this class.
        if (ColorGenerationService._instance) {
            return ColorGenerationService._instance
        }
        ColorGenerationService._instance = this
        this.colorsForUsers = {}
    }

    get_random = () => {
        var letters = '89ABCD'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    getColorForUser = (id) => {
        if(this.colorsForUsers.hasOwnProperty(id) === false){
            this.colorsForUsers[id] = this.get_random()
        }
        return this.colorsForUsers[id]
    }

}