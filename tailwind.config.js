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
                    'shadow-color': '#e3e3e3',
                    'primary': '#38BCFFFF',
                    'secondary': '#37a4a4',
                    'active': '#4ec1ff'
                },
                'dark': {
                    'bg-color': '#000000',
                    'fg-color': '#ffffff',
                    'shadow-color': '#343434',
                    'primary': 'rgb(56, 189, 248)',
                    'secondary': '#37a4a4',
                    'active': '#4ec1ff'
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
    plugins: [
        require('@headlessui/tailwindcss'),
        require('@headlessui/tailwindcss')({ prefix: 'ui' })
    ]
}
