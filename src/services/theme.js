export class themeService {

    constructor() { // making single instantiation for this class.
        if (themeService._instance) {
            return themeService._instance
        }
        themeService._instance = this
        this.colorsForUsers = {}
    }

    get_random = () => {
        // const r = Math.floor(Math.random() * 190);
        // const g = Math.floor(Math.random() * 190);
        // const b = Math.floor(Math.random() * 190);
        // return `rgba(${r}, ${g}, ${b}, 0.5)`
        const number = (Math.random() * 360)
        return 'hsla(' + number + ', 100%, 40%, 0.6)';
    }

    getColorForUser = (id) => {
        if (this.colorsForUsers.hasOwnProperty(id) === false) {
            this.colorsForUsers[id] = this.get_random()
        }
        return this.colorsForUsers[id]
    }

    getBGColor = () => {
        const html = document.querySelector("html");
        const st = getComputedStyle(html)
        return st.backgroundColor

    }

    getFGColor = () => {
        const html = document.querySelector("html");
        const st = getComputedStyle(html)
        return st.color
    }


}