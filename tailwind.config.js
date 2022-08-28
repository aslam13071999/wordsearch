/** @type {DefaultColors} */


module.exports = {
    darkMode: 'class',
    mode: "jit",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",

    ],
    theme: {

        extend: {
            colors: {
                'light': {
                    'fg-color': '#000000',
                    'bg-color': '#ffffff',
                    'primary': 'rgb(56, 189, 248)',
                    'secondary': '#37a4a4',
                },
                'dark': {
                    'bg-color': '#000000',
                    'fg-color': '#ffffff',
                    'primary': 'rgb(56, 189, 248)',
                    'secondary': '#37a4a4',
                }
            },
            fontFamily: {
                'title': 'DynaPuff',
                'heading': 'roboto',
                'secondary-heading': 'roboto',
                'paragraph': 'roboto',
                'normal': 'roboto',
                'robo': "'Exo 2'"
            },
        }
    },
    plugins: []
}
