



export class ColorGenerationService{

    get_random = () => {
        var letters = '89ABCD'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }
}